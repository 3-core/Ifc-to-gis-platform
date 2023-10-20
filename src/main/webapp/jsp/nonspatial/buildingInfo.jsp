<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<script src="${pageContext.request.contextPath}/js/jquery-3.5.1.min.js"></script>
<%--<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>--%>
<script src="${pageContext.request.contextPath}/js/libs/jstree-3.3.16-0/jstree.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/js/libs/jstree-3.3.16-0/themes/default/style.css"/>
<style>
    .building-info-popup{
        position: fixed;
        right: 100px;
        top: 190px;
        background-color: white;
        padding: 15px 12px;
        border-radius: 10px;
        z-index: 3;
        box-shadow: 0 0 1rem 3px rgb(0 0 0/ 15%);
        min-height: 100px;
        max-height: 300px;
        min-width: 200px;
        max-width: 400px;
    }

    .close-building-info-btn{
        width: 24px;
        height : 24px;
        background-position : 100% 50%;
        background-repeat : no-repeat;
        background-image : url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAANVJREFUKFONkrENwjAQRe+khAYKF3RQ0KQmGwAbwCYwCWwCGxA2gA0yQgrSEEvGZzshts4WKS969ve/h2JRlBnCWb67Q9PUDSQ+IVYim+VXqeCE82VRAeAGlHrKttvFYANN8zsglgDqgXYwqQBhHYM9SMFLtp8tUrIUzEGUyoAxmOZDPHdT/5QB5GBzIr0pgMw4LNGLTT8ZKAH27RHIt81EdZC+yUbl2w7K+UFUuS2HX9VoHT7UtxdblROAh1KrGilnjUgr52Ib5azkFy35/k/Jb1ry4xcA+M/ZZH7nxgAAAABJRU5ErkJggg==');
        transition : background-image .2s linear;
    }

    .close-building-info-btn:hover{
        background-image : url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAMFJREFUKFONksERAiEMRTcXuNqJdrDagXaiRzjRgXaiHagdaCde4YJJhmWWNWHc0w7wkp//A977Tc75bK09hBA+Q+fD+1WM8QoAJ3DOPfBnxPcvY8xOgwlKKd3xHTV6QqlC8FqDF9Ab1W2BlPVgCSJVDGownc/kcadplApKcKlJMzUQnTegAA8SpIKTvNJRdPtH6nwmrqy43ZizNIJADFyMqsahuadFxQugQb2o6spp7kkwr1xZ8guGu/9zyW9o2PELde7cwV9sZ3oAAAAASUVORK5CYII=');
    }

    .building-info-container{
        padding-top: 20px;
    }

</style>
<div class="building-info-popup" style="display : none;overflow:auto; ">
    <div class="desc-top" >
        <h2 class="title">건물 정보</h2>
        <button class="close-building-info-btn"></button>
    </div>

    <div id="building-info-container" class="building-info-container" style="overflow:auto; border:1px solid silver; margin-top: 10px" ></div>
    <script>
        var jstreeBuildingInfoInstance = $.jstree.create('#building-info-container', {
            'plugins' : ["types"],
            'types': {
                'default': {
                    'icon': false
                }
            },
            'core': {
                'data': [{
                    "id": 1,
                    "text": "검색 결과 없음",
                }]
            }
        });
    </script>
</div>