// 타입 선언 추가
// Firefox, safari 지원 안됨
interface NavigatorUAData {
  platform: string;
}

interface Navigator {
  userAgentData?: NavigatorUAData;
}

export const mac: boolean = (() => {
  if (typeof window === 'undefined') return false;

  const platform =
    (window.navigator as Navigator)?.userAgentData?.platform || window.navigator?.platform || '';
  const userAgent = window.navigator?.userAgent || '';

  return /Mac|iPhone|iPad|iPod/i.test(platform) || /Mac|iPhone|iPad|iPod/i.test(userAgent);
})();
