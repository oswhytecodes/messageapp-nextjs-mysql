export default function Component() {
  const { data } = useSession();
  const { accessToken } = data;
  return <div>Access Token: {accessToken}</div>;
}
