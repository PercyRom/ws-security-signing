package pe.com.aldem.seguridad.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import pe.com.aldem.seguridad.bean.BeanMenu;
import pe.com.aldem.seguridad.bean.BeanUsuario;
import pe.com.aldem.seguridad.controller.dao.ILogin;
import pe.com.aldem.seguridad.model.Menu;
import pe.com.aldem.seguridad.model.Usuario;
import pe.com.aldem.util.$;
import pe.com.aldem.util.$$;

public class CLogin implements ILogin {

	@Override
	public BeanUsuario getUsuario(Usuario usuario) {
		Connection conection = new $$().aldem();
		CallableStatement stmt = null;
		ResultSet result = null;
		BeanUsuario bean = null;
		String sql = "{CALL PRO_R_USUARIO(?)}";
		try {

			stmt = conection.prepareCall(sql);
			stmt.setString(1, usuario.getUsuario());
			result = stmt.executeQuery();

			result.next();
			bean = new BeanUsuario();
			bean.getUsuario().setId_persona(result.getInt("id_persona"));
			bean.getUsuario().setId_usuario(result.getInt("id_usuario"));
			bean.getUsuario().setUsuario(result.getString("usuario"));
			bean.getUsuario().setFotografia(result.getString("fotografia"));
			bean.getPersona().setId_persona(result.getInt("id_persona"));
			bean.getPersona().setNombres(result.getString("nombres"));
			bean.getPerfil().setId_perfil(result.getInt("id_perfil"));
			bean.getPerfil().setNombre(result.getString("perfil"));

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			$.K(conection, stmt);
		}
		return bean;
	}

	@Override
	public BeanMenu getMenu(Usuario usuario) {
		Connection conection = new $$().aldem();
		CallableStatement stmt = null;
		ResultSet result = null;
		String sql = "{CALL PRO_R_LOGIN(?,?)}";
		BeanMenu bean = null;

		try {

			stmt = conection.prepareCall(sql);
			stmt.setString(1, usuario.getUsuario());
			stmt.setString(2, usuario.getPassword());
			result = stmt.executeQuery();

			List<Menu> lsMenu = new ArrayList<Menu>();
			Menu mn = null;
			while (result.next()) {
				mn = new Menu();
				mn.setId_menu(result.getInt("id_menu"));
				mn.setId(result.getString("key"));
				mn.setText(result.getString("text"));
				mn.setExpanded(result.getBoolean("expanded"));
				mn.setLeaf(result.getBoolean("leaf"));
				mn.setFather(result.getInt("father"));
				lsMenu.add(mn);
			}

			List<Menu> auxLsMenu = new ArrayList<Menu>();

			/**
			 * Para Mostrar las opciones el menu 
			 * tiene que tener como minimo un subnmenu
			 * 		
			 */
			for (Menu menu : lsMenu) {
				for (Menu submenu : lsMenu) {
					if (menu.getId_menu() == submenu.getFather()) {
						menu.getMenu().add(submenu);
						auxLsMenu.add(menu);
					}
				}
			}
			
			Iterator<Menu> iter = auxLsMenu.iterator();
			while (iter.hasNext()) {
				Menu p = iter.next();
			  if (p.getFather()!=0) iter.remove();
			}

			bean = new BeanMenu();

			if (!auxLsMenu.isEmpty()) {
				bean.setMenus(auxLsMenu);
			}
			
		} catch (

		SQLException e) {
			e.printStackTrace();
		} finally {
			$.K(conection, stmt);
		}
		return bean;
	}
	
	

}
