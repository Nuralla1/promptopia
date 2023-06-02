import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
        <p className="desc text-center">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum rem
          expedita aspernatur debitis iure fuga voluptates voluptate, fugit
          quod, incidunt id. Illo ad, perferendis porro eius accusamus
          reiciendis ab velit.
        </p>
        <Feed />
      </h1>
    </section>
  );
};

export default Home;
