

export default function Home() {
  return (
    <div className="w-full h-[100vh] p-10 bg-[#f4f5fa] flex flex-col justify-center">
      <h1>teste</h1>
    </div>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const response = await stripe.products.list({
//     expand: ["data.default_price"],
//   });

//   const products = response.data.map((product) => {
//     const price = product.default_price as Stripe.Price;

//     return {
//       id: product.id,
//       name: product.name,
//       imageUrl: product.images[0],
//       price: new Intl.NumberFormat("pr-BR", {
//         style: "currency",
//         currency: "BRL",
//       }).format(price.unit_amount! / 100),
//       sizes: product.metadata.sizes.split(","),
//       colors: product.metadata.colors.split(","),
//     };
//   });

//   return {
//     props: {
//       products,
//     },
//     revalidate: 60 * 60 * 2, // 2 Hours
//   };
// };
