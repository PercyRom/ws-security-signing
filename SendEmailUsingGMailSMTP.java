package pe.com.aldem;

import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

public class SendEmailUsingGMailSMTP {
	
	   public static void main(String[] args) {
		      // Recipient's email ID needs to be mentioned.
		      String to = "percyrom@gmail.com";//change accordingly

		      // Sender's email ID needs to be mentioned
		      String from = "aldem.soft@gmail.com";//change accordingly
		      final String username = "aldem.soft@gmail.com";//change accordingly
		      final String password = "aldem-soft";//change accordingly

		      // Assuming you are sending email through relay.jangosmtp.net
		      String host = "smtp.gmail.com";

		      Properties props = new Properties();
		      props.put("mail.smtp.auth", "true");
		      props.put("mail.smtp.starttls.enable", "true");
		      props.put("mail.smtp.host", host);
		      props.put("mail.smtp.port", "587");

		      // Get the Session object.
		      Session session = Session.getInstance(props,
		      new javax.mail.Authenticator() {
		         protected PasswordAuthentication getPasswordAuthentication() {
		            return new PasswordAuthentication(username, password);
		         }
		      });

		      try {
		         // Create a default MimeMessage object.
		         Message message = new MimeMessage(session);

		         // Set From: header field of the header.
		         message.setFrom(new InternetAddress(from));

		         // Set To: header field of the header.
		         message.setRecipients(Message.RecipientType.TO,
		         InternetAddress.parse(to));

		         // Set Subject: header field
		         message.setSubject("Testing Subject");
		         
		         // Create the message part
		         BodyPart messageBodyPart = new MimeBodyPart();

		         // Now set the actual message
		         messageBodyPart.setContent("<b>Hello</b>,<h1>This is actual message embedded in HTML tags</h1>","text/html");

		         // Create a multipar message
		         Multipart multipart = new MimeMultipart();

		         // Set text message part
		         multipart.addBodyPart(messageBodyPart);
		         
		      // Part two is attachment
		         messageBodyPart = new MimeBodyPart();
		         String filename = "C:\\Users\\PERSIE\\Desktop\\19.pdf";
		         DataSource source = new FileDataSource(filename);
		         messageBodyPart.setDataHandler(new DataHandler(source));
		         messageBodyPart.setFileName("19.pdf");
		         multipart.addBodyPart(messageBodyPart);
		         
		      // Send the complete message parts
		         message.setContent(multipart);
		         
		         // Send message
		         Transport.send(message);

		         System.out.println("Sent message successfully....");

		      } catch (MessagingException e) {
		            throw new RuntimeException(e);
		      }
		   }

}
