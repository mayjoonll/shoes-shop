export const formatKRW = (num) => {
  if (typeof num != "number") return num;
  return num.toLocaleString('ko-KR', {style : 'currency', currency: 'KRW'})
}