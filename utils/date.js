// 剩余多少秒，先对分钟求模，余数就是秒
// 剩余多少分钟，先对小时求模，余数是以秒计算的分钟，除以60换算为分钟取整
// 剩余多少小时，先对天求模运算，余数是以秒计算的小时，除以60*60换算为小时取整
// 剩余多少天，直接换算为天取整
export const formatDuring = (mss) => {
  const days = Math.floor(mss / (1000 * 60 * 60 * 24));
  const hours = Math.floor((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = (mss % (1000 * 60)) / 1000;

  return `${days > 0 ? `${days}天` : ''}${hours > 0 ? `${hours}小时` : ''}${minutes > 0 ? `${minutes}分钟` : ''}${seconds > 0 ? `${seconds}秒` : ''}`;
}