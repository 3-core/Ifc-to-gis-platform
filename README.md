# Ifc-to-gis-platform
## 프로젝트 환경
- Tool : IntelliJ Community
- Apache Tomcat
- JDK 17
- Spring Boot 2.7.4
- maven
- war


## 브랜치 관리
- main 브랜치 : 시연 때 사용할 최종적인 브랜치 입니다.
- develop 브랜치 : 각 기관에서 merge해주실 브랜치로 세 기관이 공유하는 브랜치입니다. <br>
  - rebase 후 merge 전략을 사용합니다.
- 각 기관 브랜치(예시: 수성 브랜치 soosung)
  - 기관 브랜치 내의 브랜치 관리 방식은 기관별로 결정하셔서 사용하시면 됩니다.

## 배포 관리 
heliosen_server 브랜치 내용반영하여 PUSH하면 5분간격으로 배포 반영됩니다.

최종 개발후 시연서버에 이전 배포 예정입니다. 연결 주소 참고바랍니다.

개발서버(5분간격 자동반영) : 
http://office.heliosen.co.kr:18089/

시연서버(개발최종완료후 배포예정) :
http://server.heliosen.co.kr:18089/
