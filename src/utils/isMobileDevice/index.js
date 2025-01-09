export const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isSmallScreen = window.innerWidth <= 768;

  const mobilePatterns = [
    /android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /blackberry/i,
    /windows phone/i,
    /opera mini/i,
    /iemobile/i,
    /mobile/i,
    /webOS/i,
    /kindle/i,
    /silk/i,
    /playbook/i,
    /tablet/i,
    /nexus/i,
    /chrome\/[0-9.]+ mobile/i,
    /firefox\/[0-9.]+ mobile/i,
  ];

  const isMobileUserAgent = mobilePatterns.some((pattern) => pattern.test(userAgent));
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const isMobile = isMobileUserAgent || isSmallScreen || isTouchDevice;

  return isMobile;
};
