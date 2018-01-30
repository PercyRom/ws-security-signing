package pe.com.aldem;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import pe.com.aldem.operaciones.Facturacion;

@WebServlet("/rptService")
public class RptService extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Inject
	private Facturacion facturacion;

	public RptService() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		facturacion.emitirFactura(request, response);

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
