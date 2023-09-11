<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<style>

    .loading_popup {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 7;
        background-color: rgba(0, 0, 0, .5);
    }

    .inter_bottom_circle {
    	width: 100%;
    	height: 100%;
    	background-image: url("./../../public/img/inter_tool_bg2.png");
    	position: relative;
    }

    .inter_circle_comp {
    	position: absolute;
    	left: 50%;
    	top: 50%;
    	transform: translate(-50%, -50%);
    }

    .inter_bottom_circle_wrap {
    	width: 101px;
    	height: 102px;
    	position: absolute;
    	right: 17px;
    	bottom: 18px;
    }
    .inter_toolC_1 {
    	top: 6px;
    	left: 50%;
    	transform: translateX(-50%);
    }

    .inter_toolC_4 {
    	bottom: 6px;
    	left: 50%;
    	transform: translateX(-50%);
    }

    .inter_toolC_2 {
    	left: 9px;
    	top: 50%;
    	transform: translateY(-50%);
    }

    .inter_toolC_3 {
    	right: 9px;
    	top: 50%;
    	transform: translateY(-50%);
    }

</style>

<!--  loading dim div -->
<div id = "loadingDim" class = "loading_popup" style = "display: none; justify-content: center;">
    <img src="/public/img/loading.gif" alt="loading" style = "margin: auto;display: block;width: 40%;padding-top: 365px;">
</div>

<!-- 건물 정보 팝업 -->
<div id="info-popup" class="desc-popup" style="display : none;">

    <div class="desc-top" >
        <h2 class="title">부동산종합정보</h2>
                    <button class="close-btn"></button>
    </div>
    <div class="desc-container">
        <div class="desc-tap-wrap">
            <a class="desc-tap on" title="토지대장">토지대장</a>
            <a class="desc-tap" title="공시지가">공시지가</a>
            <a class="desc-tap" title="건물 기본사항">건물 기본사항</a>
            <a class="desc-tap" title="주택가격">주택가격</a>
        </div>

        <!--토지대장-->
        <div class="desc-list">
            <div class="desc-item scroll on"> <!-- 여기 온 -->
                <div class="scroll-table" id="land">

                </div>
            <div class="desc-footer">
                <p>출처 : 국토교통부</p>
                <p class="desc">
                    ※ 국토교통부는 시민의 편의를 위해 단순 열람조회용으로 제공하고 있습니다.<br>
                    <span class="red">참고용</span>으로만 활용하시기 바랍니다.
                </p>
            </div>
        </div>


         <!--공시지가-->
         <div class="desc-item">  <!-- 여기 온 -->
            <div class="desc-scroll-list ">
                <table>
                    <tr class="desc-scroll-item">
                        <th class="desc-scroll-name">기준년도</th>
                        <th class="desc-scroll-name">기준월</th>
                        <th class="desc-scroll-name">공시지가(원)</th>
                    </tr>
                    <tr class="desc-scroll-item">
                        <td colspan="3">
                            <div id="pPrice">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="desc-footer">
                <p>출처 : 국토교통부</p>
                <p class="desc">
                    ※ 국토교통부는 시민의 편의를 위해 단순 열람조회용으로 제공하고 있습니다.<br>
                    <span class="red">참고용</span>으로만 활용하시기 바랍니다.
                </p>
             </div>
         </div>

        <!--건물 기본 정보-->
        <div class="desc-item scroll" > <!-- 여기 온 -->
            <div class="scroll-table" id="base">
            </div>

            <div class="desc-footer">
                <p>출처 : 국토교통부</p>
                <p class="desc">
                    ※ 국토교통부는 시민의 편의를 위해 단순 열람조회용으로 제공하고 있습니다.<br>
                    <span class="red">참고용</span>으로만 활용하시기 바랍니다.
                </p>
            </div>
        </div>

        <!--공동 주택 가격-->
         <div class="desc-item">  <!-- 여기 온 -->
            <div class="desc-scroll-list ">
                <table>
                    <tr class="desc-scroll-item">
                        <th class="desc-scroll-name">기준년도</th>
                        <th class="desc-scroll-name">기준월</th>
                        <th class="desc-scroll-name">공시지가(원)</th>
                    </tr>
                    <tr class="desc-scroll-item">
                        <td colspan="3">
                            <div id="bPrice">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="desc-footer">
                <p>출처 : 국토교통부</p>
                <p class="desc">
                    ※ 국토교통부는 시민의 편의를 위해 단순 열람조회용으로 제공하고 있습니다.<br>
                    <span class="red">참고용</span>으로만 활용하시기 바랍니다.
                </p>
             </div>
         </div>
        </div>
    </div>
</div>

<!-- 건물 정보 없음 -->
<div id= "noInfo-popup" class="desc-popup" style="display : none;">

    <div class="desc-top" >
        <h2 class="title">부동산종합정보</h2>
                    <button class="close-btn"></button>
    </div>
    <div class="desc-container">
        <div class="desc-tap-wrap">
            <a class="desc-tap" title="토지대장">토지대장</a>
            <a class="desc-tap" title="공시지가">공시지가</a>
            <a class="desc-tap" title="건물 기본사항">건물 기본사항</a>
            <a class="desc-tap" title="주택가격">주택가격</a>
        </div>

        <div class="desc-list">
            <div class="desc-item scroll on">
                <div class="scroll-table">
                    <table>
                        <tr class="desc-table-item">
                            <td class="desc-table-cont">조회 결과가 없습니다.</td>
                        </tr>
                    </table>
                </div>
            <div class="desc-footer">
                <p>출처 : 국토교통부</p>
                <p class="desc">
                    ※ 국토교통부는 시민의 편의를 위해 단순 열람조회용으로 제공하고 있습니다.<br>
                    <span class="red">참고용</span>으로만 활용하시기 바랍니다.
                </p>
            </div>
        </div>
        </div>
    </div>
</div>