import { Term } from './AgreementType';

export const AgreementDocs: Term[] = [
  {
    id: 1,
    agreed: false,
    type: '필수',
    title: '개인정보 수집, 이용 동의',
    content:
      '단국대학교 총학생회 홈페이지는 단국대학교 총학생회 서비스 회원가입 및 본인 인증을 위하여 아래와 같이 개인정보를 수집, 이용합니다.',
    details: [
      {
        title: '수집목적',
        content: '회원 식별 및 회원제 서비스 제공, 본인 인증',
      },
      {
        title: '수집항목',
        content: '아이디, 비밀번호, 학번, 이름, 전화번호',
      },
      {
        title: '보유기간',
        content: '회원 탈퇴 시까지',
      },
    ],
    notice:
      '귀하는 단국대학교 총학생회 서비스 이용에 필요한 최소한의 개인정보 수집 및 이용에 동의하지 않을 수 있으나, 동의를 거부 할 경우, 회원제 서비스 이용이 불가합니다.',
  },
  {
    id: 2,
    agreed: false,
    type: '필수',
    title: '개인정보 제 3자 제공 동의',
    content:
      '단국대학교 총학생회 홈페이지는 회원님의 개인정보를 개인정보 처리방침에서 고지한 제 3자 제공범위 내에서 제공하며, 정보 주체의 사전 동의 없이 동 범위를 초과하여 제 3자에게 제공하지 않습니다.',
    details: [
      {
        title: '제공받는 자',
        content: 'Danvery',
      },
      {
        title: '보유기간',
        content: '가입일로부터 4년',
      },
      {
        title: '제공 목적',
        content: '단국대학교 학생 복지 앱 연동',
      },
      {
        title: '제공 항목',
        content:
          '아이디, 비밀번호, 학번, 이름, 전화번호, 학과, 학년, 단국대학교 학생증 사진',
      },
    ],
    notice:
      '개인정보 제공에 대한 동의를 거부할 권리가 있으며, 동의를 거부할 경우 서비스 이용에 제한이 있을 수 있습니다.',
  },
];
