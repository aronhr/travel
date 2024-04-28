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

    lastScrollPosition = currentScrollPosition;
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return { isNavbarHidden };
}
