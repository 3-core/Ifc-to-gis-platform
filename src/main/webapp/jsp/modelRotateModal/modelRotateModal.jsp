<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<style>
    #model-rotate-modal {
        display: none;
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 350px;
        height: 230px;
        z-index: 3030;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        box-sizing: border-box;
        padding: 15px
    }

    #model-rotate-title,
    #model-rotate-content,
    #model-rotate-footer {
        height: 33.33%; /* 각 섹션을 세로로 3등분 */
    }

    #model-rotate-title {
        font-size: 20px;
        color: pink;
        text-align: center;
    }

    #model-rotate-content {
        font-size: 15px;
        color: pink;
        text-align: center;
    }

    #model-rotate-footer {
        display: none;
        font-size: 15px;
        color: pink;
        text-align: center;
        padding: 40px
    }
</style>

<script>
	const modelClosenessData = ["1", "2", "3", "4", "5", "6", "7", "8"]

    let headingValue = 228;

	document.addEventListener("DOMContentLoaded", function () {
		let angleValue = 0; // 시작 값
        let index = 0; // modelClosenessData 배열의 인덱스

        // A와 MC의 위치를 직접 참조
        const angleElement = document.querySelector("#model-rotate-angle > div:last-child");
        const modelClosenessElement = document.querySelector("#model-rotate-closeness > div:last-child");

		document.getElementById('rotate_model_button').addEventListener('click', function() {
            let intervalId = setInterval(() => {
                headingValue += 18.75;
                if (headingValue >= 360) {
                    headingValue -= 360;
                }

                const siheung_model_matrix = new Ditap.Transforms.headingPitchRollToFixedFrame(
                    new Ditap.Cartesian3.fromDegrees(
                        127.058968,
                        35.835169,
                        34.97499999999889
                    ),
                    new Ditap.HeadingPitchRoll(Ditap.Math.toRadians(headingValue), 0, 0),
                    Ditap.Ellipsoid.WGS84,
                    Ditap.Transforms.localFrameToFixedFrameGenerator("south", "east")
                );

                siheung_model1.modelMatrix = siheung_model_matrix;
            }, 1000);

            let updateIntervalId = setInterval(() => {
                    // angleValue 업데이트
                    angleValue += 18.75;
                    if (angleValue > 200) {
                        angleValue = 200;
                        clearInterval(updateIntervalId); // 200 이상이면 업데이트 중지
                    }
                    angleElement.textContent = angleValue;

                    // modelClosenessData 업데이트
                    if (index < modelClosenessData.length) {
                        modelClosenessElement.textContent = modelClosenessData[index];
                        index++;
                    } else {
                        clearInterval(updateIntervalId); // 배열의 모든 값을 표시한 뒤 업데이트 중지
                    }
                }, 1000);

            setTimeout(() => {
                clearInterval(intervalId);
                document.getElementById('model-rotate-footer').style.display = "block";
            }, 9000);

            // 모달창 작동 부분
            document.getElementById('model-rotate-modal').style.display = "block";

            setTimeout(() => {
                document.getElementById('model-rotate-modal').style.display = "none";
            }, 13000);
        });
	})

</script>

<div id="model-rotate-modal">
	<div id="model-rotate-title">
		GeoReferencing 정보
	</div>
	<div id="model-rotate-content">
		<div id="model-rotate-angle">
			<div>Angle:</div>
			<div>A</div>
		</div>
		<div id="model-rotate-closeness" style="margin-top: 10px">
			<div>ModelCloseness:</div>
            <div>MC</div>
		</div>
	</div>
	<div id="model-rotate-footer">
		GeoReferencing이 완료 되었습니다.
	</div>
</div>
