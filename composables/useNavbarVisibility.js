export default function useNavbarVisibility() {
  const isNavbarHidden = ref(false);
  let lastScrollPosition = 0;

  const handleScroll = () => {
    const currentScrollPosition =
      window.scrollY || document.documentElement.scrollTop;
    console.log(currentScrollPosition);

    if (currentScrollPosition < lastScrollPosition) {
      isNavbarHidden.value = false;
    } else {
      isNavbarHidden.value = true;
    }

    if (currentScrollPosition === 0) {
      isNavbarHidden.value = false;
    }

    lastScrollPosition = currentScrollPosition;
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  /*  let touchStartX = ref(0);
  let touchEndX = ref(0);

  const handleTouchStart = (e) => {
    touchStartX.value = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.value = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchEndX.value - touchStartX.value > 100) {
      isNavbarHidden.value = false;
    }
  };

  onMounted(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
  });

  onUnmounted(() => {
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
  }); */

  return { isNavbarHidden };
}
