import java.math.BigInteger;
import java.security.SecureRandom;

public class App {
  public static void main(String[] args) throws Exception {
	// deffed876c7125dbfa8caed733cd7d03c2cd4336c6b748aac0b3f5a37e3f4153
    BigInteger mod = new BigInteger("100865637751900889493360573523580351244825875925872349940572720152740244701523");
	// 528e7feca0f7bbbbc03c18216617e63e3207b8072802bd75cd1e9fddc43a5562
    BigInteger exponent = new BigInteger("37341428768311708519895022617468414074813802428796398161668605148158681044322");
	// 916a1d851610fbd351d88be52b0969a0cc60e89507c2fcb08276401dce5a0175
    BigInteger n = new BigInteger("65772852572080955813314734417728231668156185229568225952323655241976835080565");

    BigInteger result = n.modPow(exponent, mod);
    System.out.println("Number ^ Exponent MOD Modulus = Result");
    System.out.println("Number");
    System.out.println(n);
    System.out.println("Exponent");
    System.out.println(exponent);
    System.out.println("Modulus");
    System.out.println(mod);
    System.out.println("Result");
    System.out.println(result);		// is: 8546252218570143535170965077826976893181896988425143458256870310420260270
					// or in hex: 04d6461ce9edab059752aabd42941829ae4405ca0a0a8a8da323723339a5ae
					// but in node: 04d6461ce9edab059752aabd42941829ae4405ca0a0a8a8da323723339a5ae75
  }
}
