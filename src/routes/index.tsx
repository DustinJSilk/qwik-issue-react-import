import { component$ } from "@builder.io/qwik";

const DATA = [{ name: "a" }, { name: "b" }, { name: "c" }, { name: "d" }];

export const Card = component$((props: any) => {
  return <></>;
});

export default component$(() => {
  return (
    <>
      {DATA.map((post) => (
        <Card {...post} key={post.name} />
      ))}
    </>
  );
});
