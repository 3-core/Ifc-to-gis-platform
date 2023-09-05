<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
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

</style>

<!--  loading dim div 소스 트리 테스트-->
<div id = "loadingDim" class = "loading_popup" style = "display: none; justify-content: center;">
    <img src="/public/img/loading.gif" alt="loading" style = "margin: auto;display: block;width: 40%;padding-top: 365px;">
</div>
