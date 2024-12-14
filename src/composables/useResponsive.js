import { ref, computed, onMounted, onUnmounted } from "vue";

export default function () {
  const width = ref(window.innerWidth);

  // Update the width ref when the window is resized
  function onResize() {
    width.value = window.innerWidth;
  }

  onMounted(() => {
    window.addEventListener("resize", onResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });

  // Define breakpoints
  const breakpoints = {
    sm: 375,
    md: 768,
    lg: 1440,
  };

  // Compute properties for each breakpoint
  const isSmall = computed(() => width.value < breakpoints.sm);
  const isMedium = computed(() => width.value >= breakpoints.md);
  const isLarge = computed(() => width.value >= breakpoints.lg);
  const screenType = computed(() =>
    width.value >= breakpoints.lg
      ? "lg"
      : width.value >= breakpoints.md
      ? "md"
      : "sm"
  );

  // Return reactive properties to use in the template
  return { isSmall, isMedium, isLarge, screenType };
}
