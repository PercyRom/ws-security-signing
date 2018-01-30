package pe.com.aldem.operaciones;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;

public class Facturacion {

	public void emitirFactura(HttpServletRequest request, HttpServletResponse response) {
		try {

			Map<String, Object> parameters = new HashMap<String, Object>();
			parameters.put("param1", "yeah");

			String path = request.getServletContext().getRealPath("/") + "/report/Report_1.jrxml";

			byte[] byteStream = prepareReport(path, parameters);

			reportPDF(byteStream, response,"Report1");

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private void reportPDF(byte[] byteStream, HttpServletResponse response,String filename) {

		OutputStream outStream;
		try {
			outStream = response.getOutputStream();

			response.setContentType("application/pdf");
			response.setHeader("Content-Disposition", "inline; filename=" + filename + ".pdf");
			response.setContentLength(byteStream.length);
			outStream.write(byteStream, 0, byteStream.length);

		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	private byte[] prepareReport(String path, Map<String, Object> parameters) {
		byte[] byteStream = null;
		JasperDesign jasperDesign;
		JasperReport jasperReport;
		try {
			jasperDesign = JRXmlLoader.load(path);
			jasperReport = JasperCompileManager.compileReport(jasperDesign);
			byteStream = JasperRunManager.runReportToPdf(jasperReport, parameters, getconnection());
		} catch (Exception e) {
			e.printStackTrace();
		}

		return byteStream;

	}

	private Connection getconnection() {
		Connection con = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/aldem", "root", "root");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return con;
	}

}
