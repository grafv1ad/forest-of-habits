export function setCookie(
  name: string,
  value: string,
  props: Record<string, unknown> & { expires?: Date | string } = {}
) {
  props = {
    path: "/",
    ...props,
  };

  const exp = props.expires;
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = `${name}=${value}`;
  for (const propName in props) {
    updatedCookie += `; ${propName}`;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      // eslint-disable-next-line no-useless-escape
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1")}=([^;]*)`
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function removeCookie(name: string) {
  setCookie(name, "", { expires: new Date(0) });
}
