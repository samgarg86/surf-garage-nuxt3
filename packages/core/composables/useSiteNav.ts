export const useSiteNav = () => {
  const { locale } = useI18n();
  const { getFirstEntryOfType } = useContentful();

  // const key = computed(()=> `siteNav-${locale.value}`)
  const siteNav = useState('siteNav', () => {});

  const forceFetch = async (loc) => {
    const { fields } = await getFirstEntryOfType('hamburgerMenu', loc);
    siteNav.value = fields;
    console.log('Fetching site nav for locale', loc);
  };

  return {
    siteNav: computed(() => siteNav.value),
    forceFetch
  };
};
