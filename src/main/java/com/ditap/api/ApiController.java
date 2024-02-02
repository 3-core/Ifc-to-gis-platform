package com.ditap.api;


import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "/api")
public class ApiController {

    /**
     * 건물 행정 정보  api (기본사항, 토지대장, 공시지가, 주택가격)
     * @param apiType
     * @param pnu
     * @return JSONArray
     * @throws IOException
     * @throws ParseException
     */
    @RequestMapping(value = "/getBuildingInfo.do", method = RequestMethod.GET)
    @ResponseBody
    public JSONArray getBuildingInfo(String apiType,String pnu) throws IOException, ParseException {


        String serviceKey = "E99780D1-B2F5-36EA-9A19-DEA8939BA43B";
        String domainKey = "http://office.heliosen.co.kr:18089/";

        StringBuilder urlBuilder = null;
        String getKey = "";

        //apiType : Base(건물 기본 정보),Land(토지대장), 공시지가(PPrice), 공동 주택가격(BPrice)
        if ("Base".equals(apiType)){



            getKey = "buildingUses";

            //urlBuilder = new StringBuilder("http://apis.data.go.kr/1611000/nsdi/BuildingUseService/attr/getBuildingUse"); /*URL*/
            //urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + serviceKey); /*Service Key*/
            //urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
            //urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("50", "UTF-8")); /*한 페이지 결과 수*/
            //urlBuilder.append("&" + URLEncoder.encode("format","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*응답결과 형식(xml 또는 json)*/
            //urlBuilder.append("&" + URLEncoder.encode("pnu","UTF-8") + "=" + URLEncoder.encode(pnu, "UTF-8")); /*고유번호(8자리 이상)*/


            urlBuilder = new StringBuilder("http://api.vworld.kr/ned/data/getBuildingUse"); /* URL */
            urlBuilder.append("?" + URLEncoder.encode("key","UTF-8") + "=" + serviceKey); /*key*/
            urlBuilder.append("&" + URLEncoder.encode("domain","UTF-8") + "=" + domainKey); /*domain*/
            urlBuilder.append("&" + URLEncoder.encode("pnu","UTF-8") + "=" + URLEncoder.encode(pnu, "UTF-8")); /* 고유번호(8자리 이상) */
            urlBuilder.append("&" + URLEncoder.encode("mainPrposCode","UTF-8") + "=" + URLEncoder.encode("02000", "UTF-8")); /* 주요용도코드 */
            urlBuilder.append("&" + URLEncoder.encode("detailPrposCode","UTF-8") + "=" + URLEncoder.encode("02001", "UTF-8")); /* 세부용도코드 */
            urlBuilder.append("&" + URLEncoder.encode("format","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /* 응답결과 형식(xml 또는 json) */
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("50", "UTF-8")); /* 검색건수 (최대 1000) */
            urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /* 페이지 번호 */



        }else if("Land".equals(apiType)){

            getKey = "possessions";

            //urlBuilder = new StringBuilder("http://apis.data.go.kr/1611000/nsdi/PossessionService/attr/getPossessionAttr"); /* URL */
            //urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey); /* Service Key */
            //urlBuilder.append("&" + URLEncoder.encode("format", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /* 응답결과 형식(xml 또는 json) */
            //urlBuilder.append("&" + URLEncoder.encode("startDt", "UTF-8") + "=" + URLEncoder.encode("202009", "UTF-8")); /* 기준연월 시작일 (YYYYMM: 6자리) */
            //urlBuilder.append("&" + URLEncoder.encode("endDt", "UTF-8") + "=" + URLEncoder.encode("209909", "UTF-8")); /* 기준연월 종료일 (YYYYMM: 6자리) */
            //urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("50", "UTF-8")); /* 검색건수 */
            //urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /* 페이지 번호 */
            //urlBuilder.append("&" + URLEncoder.encode("pnu", "UTF-8") + "=" + URLEncoder.encode(pnu, "UTF-8")); /* 고유번호(8자리 이상) */

            urlBuilder = new StringBuilder("http://api.vworld.kr/ned/data/getPossessionAttr"); /* URL */
            urlBuilder.append("?" + URLEncoder.encode("key", "UTF-8") + "=" + serviceKey); /* Service Key */
            urlBuilder.append("&" + URLEncoder.encode("format", "UTF-8") + "="
                    + URLEncoder.encode("json", "UTF-8")); /* 응답결과 형식(xml 또는 json) */
            urlBuilder.append(
                    "&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("50", "UTF-8")); /* 검색건수 */
            urlBuilder.append(
                    "&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /* 페이지 번호 */

            urlBuilder.append(
                    "&" + URLEncoder.encode("pnu", "UTF-8") + "=" + URLEncoder.encode(pnu, "UTF-8")); /* 고유번호(8자리 이상) */
            urlBuilder.append("&" + URLEncoder.encode("domain","UTF-8") + "=" + domainKey); /*domain*/


        }else if("PPrice".equals(apiType)){

            getKey = "landCharacteristicss";

            //urlBuilder = new StringBuilder("http://apis.data.go.kr/1611000/nsdi/IndvdLandPriceService/attr/getIndvdLandPriceAttr"); /* URL */
            //urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey); /* Service Key */
            //urlBuilder.append("&" + URLEncoder.encode("format", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /* 응답결과 형식(xml 또는 json) */
            //urlBuilder.append("&" + URLEncoder.encode("pnu", "UTF-8") + "=" + URLEncoder.encode(pnu, "UTF-8")); /* 고유번호(8자리 이상) */
            //urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("80", "UTF-8")); /* 검색건수 */
            //urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /* 페이지 번호 */


            urlBuilder = new StringBuilder("http://api.vworld.kr/ned/data/getLandCharacteristics"); /* URL */
            urlBuilder.append("?" + URLEncoder.encode("key","UTF-8") + "=" + serviceKey); /*key*/
            urlBuilder.append("&" + URLEncoder.encode("domain","UTF-8") + "=" + domainKey); /*domain*/
            urlBuilder.append("&" + URLEncoder.encode("pnu","UTF-8") + "=" + URLEncoder.encode(pnu, "UTF-8")); /* 고유번호(8자리 이상) */
            urlBuilder.append("&" + URLEncoder.encode("format","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /* 응답결과 형식(xml 또는 json) */
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("80", "UTF-8")); /* 검색건수 (최대 1000) */
            urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /* 페이지 번호 */


        }else if("BPrice".equals(apiType)){

            getKey = "apartHousingPrices";

            //urlBuilder = new StringBuilder("http://apis.data.go.kr/1611000/nsdi/ApartHousingPriceService/attr/getApartHousingPriceAttr"); /* URL */
            //urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey); /* Service Key */
            //urlBuilder.append("&" + URLEncoder.encode("pnu", "UTF-8") + "=" + URLEncoder.encode(pnu, "UTF-8")); /* 고유번호(8자리 이상) */
            //urlBuilder.append("&" + URLEncoder.encode("format", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /* 응답결과 형식(xml 또는 json) */
            //urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("50", "UTF-8")); /* 검색건수 */


            urlBuilder = new StringBuilder("http://api.vworld.kr/ned/data/getApartHousingPriceAttr"); /* URL */
            urlBuilder.append("?" + URLEncoder.encode("key","UTF-8") + "=" + serviceKey); /*key*/
            urlBuilder.append("&" + URLEncoder.encode("domain","UTF-8") + "=" + domainKey); /*domain*/
            urlBuilder.append("&" + URLEncoder.encode("pnu","UTF-8") + "=" + URLEncoder.encode(pnu, "UTF-8")); /* 고유변호(8자리 이상) */
            urlBuilder.append("&" + URLEncoder.encode("format","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /* 응답결과 형식(xml 또는 json) */
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("50", "UTF-8")); /* 검색건수 (최대 1000) */
            urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /* 페이지 번호 */


        }

        URL url = new URL(urlBuilder.toString());

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        //System.out.println("Response code: " + conn.getResponseCode());

        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        StringBuilder sb = new StringBuilder();

        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }

        rd.close();
        conn.disconnect();

        JSONParser jsonParser = new JSONParser();
        JSONObject response = (JSONObject) jsonParser.parse(sb.toString());


        if(response.get("response") != null) {
            return null;
        }else {

            System.out.println((JSONArray) ((JSONObject) response.get(getKey)).get("field"));

            return (JSONArray) ((JSONObject) response.get(getKey)).get("field");
        }

    }
    /**
     * coordinate2address2Pnu  api
     *
     * @param coords
     * @return JSONArray
     * @throws IOException
     * @throws ParseException
     */
    @RequestMapping(value = "/getPnu.do", method = RequestMethod.GET)
    @ResponseBody
    public String getAddress(String coords) throws IOException, ParseException {

        String serviceKey = "E99780D1-B2F5-36EA-9A19-DEA8939BA43B";  //인증키 만기(2023.12)
        StringBuilder urlBuilder = null;

        urlBuilder = new StringBuilder("https://apis.vworld.kr/coord2jibun.do"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("apiKey", "UTF-8") + "=" + serviceKey); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("x", "UTF-8") + "=" + URLEncoder.encode(coords.split(",")[0], "UTF-8")); /*페이지번호*/
        urlBuilder.append("&" + URLEncoder.encode("y", "UTF-8") + "=" + URLEncoder.encode(coords.split(",")[1], "UTF-8")); /*한 페이지 결과 수*/
        urlBuilder.append("&" + URLEncoder.encode("output", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*응답결과 형식(xml 또는 json)*/
        urlBuilder.append("&" + URLEncoder.encode("epsg", "UTF-8") + "=" + URLEncoder.encode("epsg:4326", "UTF-8")); /*고유번호(8자리 이상)*/

        URL url = new URL(urlBuilder.toString());

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        //System.out.println("Response code: " + conn.getResponseCode());

        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        StringBuilder sb = new StringBuilder();

        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }

        rd.close();
        conn.disconnect();

        JSONParser jsonParser = new JSONParser();
        JSONObject response = (JSONObject) jsonParser.parse(sb.toString());

        String pnu = "";

        //make pnu
        String addr = (String) response.get("ADDR");

        String keyword = "";
        String bungieNum = "";

        if (!addr.equals("")) {

            String[] addrA = addr.split(" ");

            for (int i = 0; i < addrA.length - 1; i++) {

                if (i == 0) {
                    keyword = addrA[i];
                } else {
                    keyword += " " + addrA[i];
                }

            }
            bungieNum = addrA[addrA.length - 1];

            // make pnu code
            File file = new File("/usr/local/tomcat/webapps/ROOT/pnu.txt");

            //File file = new File("C:/Users/USER/Desktop/pnu.txt");

            //read file
            BufferedReader br = null;
            br = new BufferedReader(new FileReader(file));
            String oneLine = "";

            //각 파일의 한 라인씩 읽어들인다.
            while ((oneLine = br.readLine()) != null) {
                //키워드 검색
                if (oneLine.indexOf(keyword) != -1) {

                    pnu = oneLine.trim().split(" ")[0];
                }
            }
            //input stream close.
            br.close();

        }

        if (!pnu.equals("")){

            String mainBungieNum = "";
            String subBungieNum = "";

            //번지 구격 맞추기
            if(bungieNum.split("-").length > 1){
                //부번호 존재
                mainBungieNum = String.format("%4s", bungieNum.split("-")[0]).replace(" ", "0");

                subBungieNum = String.format("%4s", bungieNum.split("-")[1]).replace(" ", "0");

            }else{
                //부번호 미존재
                mainBungieNum = String.format("%4s", bungieNum).replace(" ", "0");

                subBungieNum = "0000";
            }
            pnu = pnu + "1" + mainBungieNum + subBungieNum;
        }


        //System.out.println(keyword);
        //System.out.println(bungieNum);

        //System.out.println(pnu);

        return pnu;
    }

}