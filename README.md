## 📖 React Native 설문조사 Form 생성 APP

```
  🔍 Google Forms(모바일 Web) 서비스를 앱(React-Native)으로 구현
  🎟 참고 링크 : https://docs.google.com/forms
```

## 프로젝트 실행

```text
  npm install
  yarn install
```

```json
  "start": "expo start",
  "android": "expo start --android",
  "ios": "expo start --ios",
  "web": "expo start --web"
```

## 기술 스택

- `TypeScript`와 `React 18.2.0`, `React-native 0.72.5`을 활용했습니다.
- 설문관련 데이터 관리를 `recoil` 전역 상태 라이브러리를 활용하여 사용 할 수 있도록 설계했어요.
- `CSS-in-JS` 방식의 `styled-components`를 활용하였습니다.

## 구현 리스트

- 설문 제목 추가, 편집
- 설문 설명 추가, 편집
- 설문 추가하기 버튼을 누르면 설문 추가
    - 단답형
    - 장문형
    - 객관식 질문
    - 체크박스
- 설문 복사 기능
- 설문 삭제 기능
- 필수 옵션 설정 기능
- 미리 보기
    - 기능에서 해당 설문지를 미리볼 수 있도록 구현
    - 해당 미리보기에서 객관식, 체크박스, 주관식 질문에 답변을 남길 수 있도록 구현
- recoil을 활용해 글로벌 state로 모든 상태를 관리
- 설문 타입 설정은 구글 설문과 다르게 ActionSheet로 구성(아래에서 올라오는 ActionSheet를 활용)

## 고민 한 점/아쉬운 점

**1. 이미지 렌더링 최적화**
- 이미지 압축 : 기존 이미지의 크기를 60퍼센트 감소( webp변환 방식보다 기존 이미지를 압축하는 방식이 15퍼센트 더 감소할 수 있어서 이미지 압축방식을 선택 )
- Expo-image : expo에서 제공하는 Expo-image를 사용해 이미지 렌더링 속도를 최적화 (https://docs.expo.dev/versions/latest/sdk/image)
- Expo-Image와 이미지 압축을 통해 이미지 렌더링 속도를 향상시켰지만, 이미지 최적화를 더 개선하기 위해 이미지 캐싱 등의 방법을 고려

**2. 테스트 코드**
- Jest를 통해 철저한 단위 테스트를 구현하고, 신속한 코드 변경 사항 검증 및 피드백 확보
- 상태 관리 라이브러리와 테스트 코드의 효율적인 결합으로 애플리케이션 상태 관리의 안정성과 신뢰성 강화
- 테스트 코드 작성을 통해 코드 품질 향상과 버그 조기 예방의 전문적인 경험을 적용 및 증진

## 구현 기능 시연 영상

#### ✅ 설문 제목 및 설명 수정

![설문지 제목](https://github.com/pie-sfac/2-15-onePunch/assets/114569429/40349b03-b489-4315-bcb4-46880525b8a7)

#### ✅ 설문유형(단답형)

![설문지_단답형](https://github.com/pie-sfac/2-15-onePunch/assets/114569429/d5626d0d-fc1d-4151-b3c0-d1005549cf29)

#### ✅ 설문유형(장문형)

![설문지_장문형](https://github.com/pie-sfac/2-15-onePunch/assets/114569429/2aff0dfa-c773-4f73-ae35-7cfa130286c1)

#### ✅ 설문유형(객관식)

![설문지_객관식](https://github.com/pie-sfac/2-15-onePunch/assets/114569429/464e9750-76c0-46a4-a6f8-f183c02ab492)

#### ✅ 설문유형(체크박스)

![설문지_체크박스](https://github.com/pie-sfac/2-15-onePunch/assets/114569429/5f65fae3-7b89-4cad-ae41-3d2ea60dbf76)

#### ✅ 설문유형(최종)

![설문지_최종](https://github.com/pie-sfac/2-15-onePunch/assets/114569429/d9bbf580-ba02-4547-a4e8-36595e2ac1be)

