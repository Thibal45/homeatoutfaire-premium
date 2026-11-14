import com.android.apksig.ApkSigner;
import com.android.apksig.ApkVerifier;
import java.io.*;
import java.nio.file.*;
import java.security.*;
import java.security.cert.*;
import java.util.*;
import java.util.jar.*;
import java.util.zip.*;
import jdk.security.jarsigner.JarSigner;

/** Local release signing. The keystore and password are never part of source or CI. */
class SignAndroid {
  public static void main(String[] args) throws Exception {
    if(args.length != 5) {
      System.out.println("Usage: SignAndroid.java apk|bundle INPUT OUTPUT KEYSTORE ALIAS; password in HATF_SIGNING_PASSWORD");
      return;
    }
    String secret = System.getenv("HATF_SIGNING_PASSWORD");
    if(secret == null || secret.isBlank()) throw new IllegalStateException("Signing password missing from the environment");
    KeyStore store = KeyStore.getInstance("PKCS12");
    try(InputStream input = Files.newInputStream(Path.of(args[3]))) { store.load(input, secret.toCharArray()); }
    PrivateKey key = (PrivateKey)store.getKey(args[4], secret.toCharArray());
    X509Certificate certificate = (X509Certificate)store.getCertificate(args[4]);
    if(key == null || certificate == null) throw new IllegalArgumentException("Signing identity not found");
    if(args[0].equals("apk")) {
      var signer = new ApkSigner.SignerConfig.Builder("HOMEATOUTFAIRE", key, List.of(certificate)).build();
      new ApkSigner.Builder(List.of(signer)).setInputApk(new File(args[1])).setOutputApk(new File(args[2]))
        .setMinSdkVersion(24).setV1SigningEnabled(true).setV2SigningEnabled(true).setV3SigningEnabled(true).build().sign();
      var result = new ApkVerifier.Builder(new File(args[2])).setMinCheckedPlatformVersion(24).build().verify();
      if(!result.isVerified()) throw new SecurityException("APK signature verification failed: " + result.getErrors());
      System.out.println("APK verified: v1=" + result.isVerifiedUsingV1Scheme() + ", v2=" + result.isVerifiedUsingV2Scheme() + ", v3=" + result.isVerifiedUsingV3Scheme());
    } else if(args[0].equals("bundle")) {
      CertPath chain = CertificateFactory.getInstance("X.509").generateCertPath(List.of(certificate));
      JarSigner signer = new JarSigner.Builder(key, chain).digestAlgorithm("SHA-256").signatureAlgorithm("SHA256withRSA").build();
      try(ZipFile input = new ZipFile(args[1]); OutputStream output = Files.newOutputStream(Path.of(args[2]))) { signer.sign(input, output); }
      int checked = 0;
      try(JarFile signed = new JarFile(args[2], true)) {
        for(var entry : Collections.list(signed.entries())) {
          if(entry.isDirectory()) continue;
          try(InputStream input = signed.getInputStream(entry)) { input.transferTo(OutputStream.nullOutputStream()); }
          if(!entry.getName().startsWith("META-INF/")) {
            if(entry.getCodeSigners() == null) throw new SecurityException("Unsigned bundle entry: " + entry.getName());
            checked++;
          }
        }
      }
      System.out.println("Bundle JAR signature verified: " + checked + " entries");
    } else throw new IllegalArgumentException("Expected apk or bundle");
    System.out.println("Certificate SHA-256: " + HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(certificate.getEncoded())));
  }
}
