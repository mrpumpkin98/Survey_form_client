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

## 구현 기능 시연 영상

![Peek 2023-10-10 12-25](https://github.com/mrpumpkin98/Frontend-Study/assets/114569429/c37a4174-33e6-4d89-8a78-155d6af0ae48)

## 고민 한 점/아쉬운 점

**1. 이미지 렌더링 최적화**
   - 이미지 압축 : 기존 이미지의 크기를 60퍼센트 감소( webp변환 방식보다 기존 이미지를 압축하는 방식이 15퍼센트 더 감소할 수 있어서 이미지 압축방식을 선택 )
   - Expo-image : expo에서 제공하는 Expo-image를 사용해 이미지 렌더링 속도를 최적화 (https://docs.expo.dev/versions/latest/sdk/image)
   - Expo-Image와 이미지 압축을 통해 이미지 렌더링 속도를 향상시켰지만, 이미지 최적화를 더 개선하기 위해 이미지 캐싱 등의 방법을 고려
