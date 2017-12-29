<%@page contentType="text/html;charset=UTF-8"%>
<% request.setCharacterEncoding("UTF-8"); %>
<HTML>
<HEAD>
<TITLE>Result</TITLE>
</HEAD>
<BODY>
<H1>Result</H1>

<jsp:useBean id="sampleWSSPersonalProxyid" scope="session" class="pe.com.wss.proj.service.WSSPersonalProxy" />
<%
if (request.getParameter("endpoint") != null && request.getParameter("endpoint").length() > 0)
sampleWSSPersonalProxyid.setEndpoint(request.getParameter("endpoint"));
%>

<%
String method = request.getParameter("method");
int methodID = 0;
if (method == null) methodID = -1;

if(methodID != -1) methodID = Integer.parseInt(method);
boolean gotMethod = false;

try {
switch (methodID){ 
case 2:
        gotMethod = true;
        java.lang.String getEndpoint2mtemp = sampleWSSPersonalProxyid.getEndpoint();
if(getEndpoint2mtemp == null){
%>
<%=getEndpoint2mtemp %>
<%
}else{
        String tempResultreturnp3 = org.eclipse.jst.ws.util.JspUtils.markup(String.valueOf(getEndpoint2mtemp));
        %>
        <%= tempResultreturnp3 %>
        <%
}
break;
case 5:
        gotMethod = true;
        String endpoint_0id=  request.getParameter("endpoint8");
            java.lang.String endpoint_0idTemp = null;
        if(!endpoint_0id.equals("")){
         endpoint_0idTemp  = endpoint_0id;
        }
        sampleWSSPersonalProxyid.setEndpoint(endpoint_0idTemp);
break;
case 10:
        gotMethod = true;
        pe.com.wss.proj.service.WSSPersonal getWSSPersonal10mtemp = sampleWSSPersonalProxyid.getWSSPersonal();
if(getWSSPersonal10mtemp == null){
%>
<%=getWSSPersonal10mtemp.getPersonas()[0] %>
<%
}else{
%>
<TABLE>
<TR>
<TD COLSPAN="3" ALIGN="LEFT">returnp:</TD>
</TABLE>
<%
}
break;
case 15:
        gotMethod = true;
        pe.com.wss.proj.service.Persona[] getPersonas15mtemp = sampleWSSPersonalProxyid.getPersonas();
if(getPersonas15mtemp == null){
%>
<%=getPersonas15mtemp %>
<%
}else{
        String tempreturnp16 = null;
        if(getPersonas15mtemp != null){
        java.util.List listreturnp16= java.util.Arrays.asList(getPersonas15mtemp);
        tempreturnp16 = listreturnp16.toString();
        }
        %>
        <%=tempreturnp16%>
        <%
}
break;
case 18:
        gotMethod = true;
        String arg0_1id=  request.getParameter("arg021");
            java.lang.String arg0_1idTemp = null;
        if(!arg0_1id.equals("")){
         arg0_1idTemp  = arg0_1id;
        }
        java.lang.String getSaludo18mtemp = sampleWSSPersonalProxyid.getSaludo(arg0_1idTemp);
if(getSaludo18mtemp == null){
%>
<%=getSaludo18mtemp %>
<%
}else{
        String tempResultreturnp19 = org.eclipse.jst.ws.util.JspUtils.markup(String.valueOf(getSaludo18mtemp));
        %>
        <%= tempResultreturnp19 %>
        <%
}
break;
}
} catch (Exception e) { 
%>
Exception: <%= org.eclipse.jst.ws.util.JspUtils.markup(e.toString()) %>
Message: <%= org.eclipse.jst.ws.util.JspUtils.markup(e.getMessage()) %>
<%
return;
}
if(!gotMethod){
%>
result: N/A
<%
}
%>
</BODY>
</HTML>