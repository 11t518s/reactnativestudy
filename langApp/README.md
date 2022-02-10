# initialReactNativeWithTypescript


### 초기에 CRA없이 해당 파일을 클론해서 사용하면 된다.

수정해야할 사항

1. package.json에 name수정
2. test 필요시 jest.config 파일 생성 필요.
3. 초기 실행 시 npm install 과 npx pod-install ios 를 해줘야 함
4. android의 경우 ./android/build.gradle 에         targetSdkVersion을 확인하여 해당 sdk와 vmd manager를 설치해줘야 한다.

단 모든 경우는 react-native 공식 문서에서 권장하는 환경설정을 모두 마친 사람에 해당하며, m1 의 경우 android 작동을 원할 시 arm 기반의 sdk 파일을 다운로드 받아야 한다.