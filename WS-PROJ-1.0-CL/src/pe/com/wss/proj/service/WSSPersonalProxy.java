package pe.com.wss.proj.service;

public class WSSPersonalProxy implements pe.com.wss.proj.service.WSSPersonal {
  private String _endpoint = null;
  private pe.com.wss.proj.service.WSSPersonal wSSPersonal = null;
  
  public WSSPersonalProxy() {
    _initWSSPersonalProxy();
  }
  
  public WSSPersonalProxy(String endpoint) {
    _endpoint = endpoint;
    _initWSSPersonalProxy();
  }
  
  private void _initWSSPersonalProxy() {
    try {
      wSSPersonal = (new pe.com.wss.proj.service.WSSPersonalServiceLocator()).getWSSPersonalPort();
      if (wSSPersonal != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)wSSPersonal)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)wSSPersonal)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (wSSPersonal != null)
      ((javax.xml.rpc.Stub)wSSPersonal)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public pe.com.wss.proj.service.WSSPersonal getWSSPersonal() {
    if (wSSPersonal == null)
      _initWSSPersonalProxy();
    return wSSPersonal;
  }
  
  public pe.com.wss.proj.service.Persona[] getPersonas() throws java.rmi.RemoteException{
    if (wSSPersonal == null)
      _initWSSPersonalProxy();
    return wSSPersonal.getPersonas();
  }
  
  public java.lang.String getSaludo(java.lang.String arg0) throws java.rmi.RemoteException{
    if (wSSPersonal == null)
      _initWSSPersonalProxy();
    return wSSPersonal.getSaludo(arg0);
  }
  
  
}