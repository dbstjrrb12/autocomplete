const baseUrl =
  'https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=';

export const request = async (value) => {
  const requestVal = baseUrl + value;

  try {
    return await fetch(requestVal).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  } catch {
    console.error('데이터 요청에 실패하였습니다. 다시 시도해주세요');
  }
};
