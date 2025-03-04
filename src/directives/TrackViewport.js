export default {
  mounted(el, binding) {
    const targetEvent = binding.value || "viewport-section-viewed"; // 可指定事件名稱

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 當目標區塊進入視口
          console.log("SectionViewed", `event:${targetEvent}`, `id:${el.id}`);
          // window.dataLayer = window.dataLayer || [];
          window.dataLayer?.push({
            event: "cwdigiteam",
            action: "2024newtaipeiriverAction",
            tag: el.id || "unknown-section", // 可用元素 ID 或其他標識
          });
          if (!!fbq) {
            fbq("track", "cwdigiteam", {
              action: "2024newtaipeiriverAction",
              tag: el.id || "unknown-section",
            });
          }
        }
      },
      { threshold: 0.5 } // 滾動到 50% 可見時觸發
    );

    observer.observe(el);

    // 儲存觀察器，方便清理
    el._observer = observer;
  },
  unmounted(el) {
    if (el._observer) {
      el._observer.disconnect();
      delete el._observer;
    }
  },
};
