/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const main = async () => {
  await prismaClient.$transaction(async (tx: any) => {
    await tx.restaurant.deleteMany();

    const fswDonalds = await tx.restaurant.create({
      data: {
        name: "FSW Donalds",
        slug: "fsw-donalds",
        description: "O melhor fast food do mundo",
        avatarImageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQvcNP9rHlEJu1vCY5kLqzjf29HKaeN78Z6pRy",
        coverImageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQac8bHYlkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
      },
    });

    const combosCategory = await tx.menuCategory.create({
      data: {
        name: "Combos",
        restaurantId: fswDonalds.id,
      },
    });

    await tx.product.createMany({
      data: [
        {
          name: "McOferta Média Big Mac Duplo",
          description:
            "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQaHB8tslkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
          menuCategoryId: combosCategory.id,
          restaurantId: fswDonalds.id,
          ingredients: [
            "Pão com gergilim",
            "Hambúrguer de carne 100% bovina",
            "Alface americana",
            "Queijo fatiado sabor cheddar",
            "Molho especial",
            "Cebola",
            "Picles",
          ],
        },
        {
          name: "Novo Brabo Melt Onion Rings",
          description:
            "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
          price: 41.5,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQeGQofnEPyQaHEV2WL8rGUs41oMICtYfNkphl",
          menuCategoryId: combosCategory.id,
          restaurantId: fswDonalds.id,
          ingredients: [
            "Pão tipo brioche",
            "Hambúrguer de carne 100% bovina",
            "Méquinese",
            "Maionese especial com sabor de carne defumada",
            "Onion rings",
            "Fatias de bacon",
            "Queijo processado sabor cheddar",
            "Molho lácteo com queijo tipo cheddar",
          ],
        },
        {
          name: "McCrispy Chicken Elite",
          description:
            "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQr12aTqPo3SsGjBJCaM7yhxnbDlXeL5N9dckv",
          menuCategoryId: combosCategory.id,
          restaurantId: fswDonalds.id,
          ingredients: [
            "Pão tipo brioche",
            "Batata",
            "Molho Honey&Fire",
            "Bacon em fatias",
            "Alface",
            "Tomate",
            "Queijo sabor cheddar",
            "Carne 100% de peito de frango",
          ],
        },
        {
          name: "Duplo Cheddar McMelt",
          description:
            "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.",
          price: 36.2,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQWdq0w8niS9XCLQu7Nb4jvBYZze16goaOqsKR",
          menuCategoryId: combosCategory.id,
          restaurantId: fswDonalds.id,
          ingredients: [
            "Pão escuro com gergelim",
            "Hambúrguer de carne 100% bovina",
            "Molho lácteo com queijo tipo cheddar",
            "Cebola ao molho shoyu",
          ],
        },
      ],
    });

    const hamburguersCategory = await tx.menuCategory.create({
      data: {
        name: "Lanches",
        restaurantId: fswDonalds.id,
      },
    });

    await tx.product.createMany({
      data: [
        {
          name: "Big Mac",
          description:
            "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
          ingredients: [
            "Pão com gergilim",
            "Hambúrguer de carne 100% bovina",
            "Alface americana",
            "Queijo fatiado sabor cheddar",
            "Molho especial",
            "Cebola",
            "Picles",
          ],
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQKfI6fivqActTvBGLXfQe4a8CJ6d3HiR7USPK",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: fswDonalds.id,
        },
        {
          name: "Duplo Quarterão",
          description:
            "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
          ingredients: [
            "Pão tipo brioche",
            "Hambúrguer de carne 100% bovina",
            "Méquinese",
            "Maionese especial com sabor de carne defumada",
            "Onion rings",
            "Fatias de bacon",
            "Queijo processado sabor cheddar",
            "Molho lácteo com queijo tipo cheddar",
          ],
          price: 41.5,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ99rtECuYaDgmA4VujBU0wKn2ThXJvF3LHfyc",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: fswDonalds.id,
        },
        {
          name: "McMelt",
          description:
            "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
          ingredients: [
            "Pão tipo brioche",
            "Batata",
            "Molho Honey&Fire",
            "Bacon em fatias",
            "Alface",
            "Tomate",
            "Queijo sabor cheddar",
            "Carne 100% de peito de frango",
          ],
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQUY0VlDTmvPeJLoyOjzNsMqFdxUI423nBl6br",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: fswDonalds.id,
        },
        {
          name: "McNífico Bacon",
          description:
            "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.",
          ingredients: [
            "Pão escuro com gergelim",
            "Hambúrguer de carne 100% bovina",
            "Molho lácteo com queijo tipo cheddar",
            "Cebola ao molho shoyu",
          ],
          price: 36.2,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBBmifbjzEVXRoycAtrP9vH45bZ6WDl3QF0a1",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: fswDonalds.id,
        },
      ],
    });

    const frenchFriesCategory = await tx.menuCategory.create({
      data: {
        name: "Fritas",
        restaurantId: fswDonalds.id,
      },
    });

    await tx.product.createMany({
      data: [
        {
          name: "Fritas Grande",
          description: "Batatas fritas crocantes e sequinhas. Vem bastante!",
          ingredients: [],
          price: 10.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQNd3jSNrcJroaszwjUAlM6iSO5ZTx2HV70t31",
          menuCategoryId: frenchFriesCategory.id,
          restaurantId: fswDonalds.id,
        },
        {
          name: "Fritas Média",
          description:
            "Batatas fritas crocantes e sequinhas. Vem uma média quantidade!",
          ingredients: [],
          price: 9.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7Y6lv9tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
          menuCategoryId: frenchFriesCategory.id,
          restaurantId: fswDonalds.id,
        },
        {
          name: "Fritas Pequena",
          description:
            "Batatas fritas crocantes e sequinhas. Vem pouquinho (é bom pra sua dieta)!",
          ingredients: [],
          price: 5.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ5toOZxYa1oARJCUGh4EY3x8NjXHtvZ7lnVfw",
          menuCategoryId: frenchFriesCategory.id,
          restaurantId: fswDonalds.id,
        },
      ],
    });

    const drinksCategoryFSW = await tx.menuCategory.create({
      data: {
        name: "Bebidas",
        restaurantId: fswDonalds.id,
      },
    });

    await tx.product.createMany({
      data: [
        {
          name: "Coca-cola",
          description: "Coca-cola gelada para acompanhar seu lanche.",
          ingredients: [],
          price: 5.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQJS1b33q29eEsh0CVmOywrqx1UPnJpRGcHN5v",
          menuCategoryId: drinksCategoryFSW.id,
          restaurantId: fswDonalds.id,
        },
        {
          name: "Fanta Laranja",
          description: "Fanta Laranja gelada para acompanhar seu lanche.",
          ingredients: [],
          price: 5.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQW7Kxm9gniS9XCLQu7Nb4jvBYZze16goaOqsK",
          menuCategoryId: drinksCategoryFSW.id,
          restaurantId: fswDonalds.id,
        },
        {
          name: "Água Mineral",
          description: "A bebida favorita do Cristiano Ronaldo.",
          ingredients: [],
          price: 2.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7i05S5tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
          menuCategoryId: drinksCategoryFSW.id,
          restaurantId: fswDonalds.id,
        },
      ],
    });

    const desertsCategory = await tx.menuCategory.create({
      data: {
        name: "Sobremesas",
        restaurantId: fswDonalds.id,
      },
    });

    await tx.product.createMany({
      data: [
        {
          name: "Casquinha de Baunilha",
          description: "Casquinha de sorvete sabor baunilha.",
          ingredients: [],
          price: 3.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQtfuQrAKkI75oJfPT0crZxvX82ui9qV3hLFdY",
          menuCategoryId: desertsCategory.id,
          restaurantId: fswDonalds.id,
        },
        {
          name: "Casquinha de Chocolate",
          description: "Casquinha de sorvete sabor chocolate.",
          ingredients: [],
          price: 3.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBH21ijzEVXRoycAtrP9vH45bZ6WDl3QF0a1M",
          menuCategoryId: desertsCategory.id,
          restaurantId: fswDonalds.id,
        },
        {
          name: "Casquinha de Mista",
          description: "Casquinha de sorvete sabor baunilha e chocolate.",
          ingredients: [],
          price: 2.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ4rBrtULypXmR6JiWuhzS8ALjVkrF3yfatC7E",
          menuCategoryId: desertsCategory.id,
          restaurantId: fswDonalds.id,
        },
      ],
    });

    // Restaurante 2: Pizza Planet
    const pizzaPlanet = await tx.restaurant.create({
      data: {
        name: "Pizza Planet",
        slug: "pizza-planet",
        description: "As melhores pizzas da galáxia!",
        avatarImageUrl: "https://u9a6wmr3as.ufs.sh/f/pizza-planet-avatar.jpg",
        coverImageUrl: "https://u9a6wmr3as.ufs.sh/f/pizza-planet-cover.jpg",
      },
    });

    // Categorias e produtos para Pizza Planet
    const pizzasCategory = await tx.menuCategory.create({
      data: {
        name: "Pizzas",
        restaurantId: pizzaPlanet.id,
      },
    });

    await tx.product.createMany({
      data: [
        {
          name: "Pizza Margherita",
          description:
            "Pizza clássica com molho de tomate, mussarela, manjericão e azeite.",
          price: 45.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/pizza-margherita.jpg",
          menuCategoryId: pizzasCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: ["Molho de tomate", "Mussarela", "Manjericão", "Azeite"],
        },
        {
          name: "Pizza Pepperoni",
          description: "Pizza com molho de tomate, mussarela e pepperoni.",
          price: 50.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/pizza-pepperoni.jpg",
          menuCategoryId: pizzasCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: ["Molho de tomate", "Mussarela", "Pepperoni"],
        },
        {
          name: "Pizza Quatro Queijos",
          description:
            "Pizza com molho de tomate, mussarela, provolone, parmesão e gorgonzola.",
          price: 55.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/pizza-quatro-queijos.jpg",
          menuCategoryId: pizzasCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: [
            "Molho de tomate",
            "Mussarela",
            "Provolone",
            "Parmesão",
            "Gorgonzola",
          ],
        },
        {
          name: "Pizza Calabresa",
          description: "Pizza com molho de tomate, mussarela e calabresa.",
          price: 48.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/pizza-calabresa.jpg",
          menuCategoryId: pizzasCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: ["Molho de tomate", "Mussarela", "Calabresa"],
        },
        {
          name: "Pizza Frango com Catupiry",
          description:
            "Pizza com molho de tomate, mussarela, frango desfiado e catupiry.",
          price: 52.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/pizza-frango-catupiry.jpg",
          menuCategoryId: pizzasCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: [
            "Molho de tomate",
            "Mussarela",
            "Frango desfiado",
            "Catupiry",
          ],
        },
      ],
    });

    const pastaCategory = await tx.menuCategory.create({
      data: {
        name: "Massas",
        restaurantId: pizzaPlanet.id,
      },
    });

    await tx.product.createMany({
      data: [
        {
          name: "Espaguete à Bolonhesa",
          description: "Espaguete com molho à bolonhesa e queijo ralado.",
          price: 35.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/espaguete-bolonhesa.jpg",
          menuCategoryId: pastaCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: ["Espaguete", "Molho à bolonhesa", "Queijo ralado"],
        },
        {
          name: "Lasanha à Bolonhesa",
          description: "Lasanha com molho à bolonhesa, queijo e presunto.",
          price: 40.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/lasanha-bolonhesa.jpg",
          menuCategoryId: pastaCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: ["Lasanha", "Molho à bolonhesa", "Queijo", "Presunto"],
        },
        {
          name: "Penne ao Molho Rosa",
          description: "Penne com molho rosé e queijo ralado.",
          price: 38.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/penne-molho-rosa.jpg",
          menuCategoryId: pastaCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: ["Penne", "Molho rosé", "Queijo ralado"],
        },
        {
          name: "Ravioli de Queijo",
          description: "Ravioli recheado com queijo e molho de tomate.",
          price: 42.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/ravioli-queijo.jpg",
          menuCategoryId: pastaCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: ["Ravioli", "Queijo", "Molho de tomate"],
        },
        {
          name: "Nhoque ao Sugo",
          description: "Nhoque com molho de tomate e queijo ralado.",
          price: 37.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/nhoque-sugo.jpg",
          menuCategoryId: pastaCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: ["Nhoque", "Molho de tomate", "Queijo ralado"],
        },
      ],
    });

    const saladsCategory = await tx.menuCategory.create({
      data: {
        name: "Saladas",
        restaurantId: pizzaPlanet.id,
      },
    });

    await tx.product.createMany({
      data: [
        {
          name: "Salada Caesar",
          description:
            "Salada com alface, croutons, queijo parmesão e molho caesar.",
          price: 25.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/salada-caesar.jpg",
          menuCategoryId: saladsCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: [
            "Alface",
            "Croutons",
            "Queijo parmesão",
            "Molho caesar",
          ],
        },
        {
          name: "Salada Grega",
          description:
            "Salada com tomate, pepino, cebola roxa, azeitonas e queijo feta.",
          price: 28.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/salada-grega.jpg",
          menuCategoryId: saladsCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: [
            "Tomate",
            "Pepino",
            "Cebola roxa",
            "Azeitonas",
            "Queijo feta",
          ],
        },
        {
          name: "Salada de Frutas",
          description: "Salada com diversas frutas frescas.",
          price: 20.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/salada-frutas.jpg",
          menuCategoryId: saladsCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: ["Frutas frescas"],
        },
        {
          name: "Salada de Quinoa",
          description: "Salada com quinoa, tomate, pepino e molho de iogurte.",
          price: 30.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/salada-quinoa.jpg",
          menuCategoryId: saladsCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: ["Quinoa", "Tomate", "Pepino", "Molho de iogurte"],
        },
        {
          name: "Salada Caprese",
          description:
            "Salada com tomate, mussarela de búfala, manjericão e azeite.",
          price: 32.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/salada-caprese.jpg",
          menuCategoryId: saladsCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: [
            "Tomate",
            "Mussarela de búfala",
            "Manjericão",
            "Azeite",
          ],
        },
      ],
    });

    const dessertsCategory = await tx.menuCategory.create({
      data: {
        name: "Sobremesas",
        restaurantId: pizzaPlanet.id,
      },
    });

    await tx.product.createMany({
      data: [
        {
          name: "Tiramisu",
          description:
            "Sobremesa italiana com café, mascarpone e biscoitos champanhe.",
          price: 18.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/tiramisu.jpg",
          menuCategoryId: dessertsCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: ["Café", "Mascarpone", "Biscoitos champanhe"],
        },
        {
          name: "Cheesecake de Morango",
          description: "Cheesecake com calda de morango.",
          price: 20.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/cheesecake-morango.jpg",
          menuCategoryId: dessertsCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: ["Queijo cremoso", "Calda de morango"],
        },
        {
          name: "Panna Cotta",
          description:
            "Sobremesa italiana com creme de leite e calda de frutas vermelhas.",
          price: 15.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/panna-cotta.jpg",
          menuCategoryId: dessertsCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: ["Creme de leite", "Calda de frutas vermelhas"],
        },
        {
          name: "Mousse de Chocolate",
          description: "Mousse cremosa de chocolate.",
          price: 12.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/mousse-chocolate.jpg",
          menuCategoryId: dessertsCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: ["Chocolate", "Creme de leite"],
        },
        {
          name: "Petit Gateau",
          description:
            "Bolo de chocolate com recheio cremoso e sorvete de baunilha.",
          price: 22.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/petit-gateau.jpg",
          menuCategoryId: dessertsCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: ["Chocolate", "Sorvete de baunilha"],
        },
      ],
    });

    const drinksCategory = await tx.menuCategory.create({
      data: {
        name: "Bebidas",
        restaurantId: pizzaPlanet.id,
      },
    });

    await tx.product.createMany({
      data: [
        {
          name: "Refrigerante Lata",
          description: "Refrigerante em lata de 350ml.",
          price: 8.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/refrigerante-lata.jpg",
          menuCategoryId: drinksCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: [],
        },
        {
          name: "Suco Natural",
          description: "Suco natural de frutas.",
          price: 10.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/suco-natural.jpg",
          menuCategoryId: drinksCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: [],
        },
        {
          name: "Água Mineral",
          description: "Água mineral sem gás.",
          price: 5.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/agua-mineral.jpg",
          menuCategoryId: drinksCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: [],
        },
        {
          name: "Cerveja Artesanal",
          description: "Cerveja artesanal de 500ml.",
          price: 15.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/cerveja-artesanal.jpg",
          menuCategoryId: drinksCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: [],
        },
        {
          name: "Vinho Tinto",
          description: "Vinho tinto seco da casa.",
          price: 50.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/vinho-tinto.jpg",
          menuCategoryId: drinksCategory.id,
          restaurantId: pizzaPlanet.id,
          ingredients: [],
        },
      ],
    });

    // Restaurante 3: Burger King
    const burgerKing = await tx.restaurant.create({
      data: {
        name: "Burger King",
        slug: "burger-king",
        description: "O rei dos hambúrgueres!",
        avatarImageUrl: "https://u9a6wmr3as.ufs.sh/f/burger-king-avatar.jpg",
        coverImageUrl: "https://u9a6wmr3as.ufs.sh/f/burger-king-cover.jpg",
      },
    });

    // Categorias e produtos para Burger King
    const burgersCategory = await tx.menuCategory.create({
      data: {
        name: "Hambúrgueres",
        restaurantId: burgerKing.id,
      },
    });

    await tx.product.createMany({
      data: [
        {
          name: "Whopper",
          description:
            "O clássico Whopper com carne grelhada, alface, tomate, maionese, ketchup, picles e cebola.",
          price: 35.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/whopper.jpg",
          menuCategoryId: burgersCategory.id,
          restaurantId: burgerKing.id,
          ingredients: [
            "Pão com gergelim",
            "Carne grelhada",
            "Alface",
            "Tomate",
            "Maionese",
            "Ketchup",
            "Picles",
            "Cebola",
          ],
        },
        {
          name: "Cheeseburger",
          description:
            "Hambúrguer com queijo, alface, tomate, cebola, picles, ketchup e maionese.",
          price: 25.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/cheeseburger.jpg",
          menuCategoryId: burgersCategory.id,
          restaurantId: burgerKing.id,
          ingredients: [
            "Pão com gergelim",
            "Hambúrguer de carne",
            "Queijo",
            "Alface",
            "Tomate",
            "Cebola",
            "Picles",
            "Ketchup",
            "Maionese",
          ],
        },
        {
          name: "Chicken Royale",
          description:
            "Hambúrguer de frango empanado, alface, tomate e maionese.",
          price: 28.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/chicken-royale.jpg",
          menuCategoryId: burgersCategory.id,
          restaurantId: burgerKing.id,
          ingredients: [
            "Pão com gergelim",
            "Frango empanado",
            "Alface",
            "Tomate",
            "Maionese",
          ],
        },
        {
          name: "Bacon King",
          description:
            "Dois hambúrgueres, queijo, bacon, ketchup, maionese e pão com gergelim.",
          price: 40.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/bacon-king.jpg",
          menuCategoryId: burgersCategory.id,
          restaurantId: burgerKing.id,
          ingredients: [
            "Pão com gergelim",
            "Hambúrguer de carne",
            "Queijo",
            "Bacon",
            "Ketchup",
            "Maionese",
          ],
        },
        {
          name: "Plant-Based Whopper",
          description:
            "Whopper com hambúrguer vegetal, alface, tomate, maionese, ketchup, picles e cebola.",
          price: 38.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/plant-based-whopper.jpg",
          menuCategoryId: burgersCategory.id,
          restaurantId: burgerKing.id,
          ingredients: [
            "Pão com gergelim",
            "Hambúrguer vegetal",
            "Alface",
            "Tomate",
            "Maionese",
            "Ketchup",
            "Picles",
            "Cebola",
          ],
        },
      ],
    });

    const friesCategory = await tx.menuCategory.create({
      data: {
        name: "Fritas",
        restaurantId: burgerKing.id,
      },
    });

    await tx.product.createMany({
      data: [
        {
          name: "Batata Frita Grande",
          description: "Batata frita crocante e sequinha.",
          price: 12.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/batata-grande.jpg",
          menuCategoryId: friesCategory.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
        {
          name: "Batata Frita Média",
          description: "Batata frita crocante e sequinha.",
          price: 10.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/batata-media.jpg",
          menuCategoryId: friesCategory.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
        {
          name: "Batata Frita Pequena",
          description: "Batata frita crocante e sequinha.",
          price: 8.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/batata-pequena.jpg",
          menuCategoryId: friesCategory.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
        {
          name: "Batata Frita com Cheddar e Bacon",
          description: "Batata frita com cheddar derretido e bacon crocante.",
          price: 18.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/batata-cheddar-bacon.jpg",
          menuCategoryId: friesCategory.id,
          restaurantId: burgerKing.id,
          ingredients: ["Batata frita", "Cheddar", "Bacon"],
        },
        {
          name: "Batata Frita Temperada",
          description: "Batata frita com tempero especial.",
          price: 15.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/batata-temperada.jpg",
          menuCategoryId: friesCategory.id,
          restaurantId: burgerKing.id,
          ingredients: ["Batata frita", "Tempero especial"],
        },
      ],
    });

    const drinksCategoryBK = await tx.menuCategory.create({
      data: {
        name: "Bebidas",
        restaurantId: burgerKing.id,
      },
    });

    await tx.product.createMany({
      data: [
        {
          name: "Coca-Cola",
          description: "Refrigerante Coca-Cola gelado.",
          price: 8.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/coca-cola.jpg",
          menuCategoryId: drinksCategoryBK.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
        {
          name: "Fanta Laranja",
          description: "Refrigerante Fanta Laranja gelado.",
          price: 8.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/fanta-laranja.jpg",
          menuCategoryId: drinksCategoryBK.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
        {
          name: "Sprite",
          description: "Refrigerante Sprite gelado.",
          price: 8.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/sprite.jpg",
          menuCategoryId: drinksCategoryBK.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
        {
          name: "Água Mineral",
          description: "Água mineral sem gás.",
          price: 5.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/agua-mineral.jpg",
          menuCategoryId: drinksCategoryBK.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
        {
          name: "Suco de Laranja",
          description: "Suco natural de laranja.",
          price: 10.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/suco-laranja.jpg",
          menuCategoryId: drinksCategoryBK.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
      ],
    });

    const dessertsCategoryBK = await tx.menuCategory.create({
      data: {
        name: "Sobremesas",
        restaurantId: burgerKing.id,
      },
    });

    await tx.product.createMany({
      data: [
        {
          name: "Sorvete de Casquinha",
          description: "Sorvete de casquinha sabor baunilha.",
          price: 6.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/sorvete-casquinha.jpg",
          menuCategoryId: dessertsCategoryBK.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
        {
          name: "Torta de Maçã",
          description: "Torta de maçã com massa crocante.",
          price: 12.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/torta-maca.jpg",
          menuCategoryId: dessertsCategoryBK.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
        {
          name: "Milk Shake de Chocolate",
          description: "Milk shake cremoso de chocolate.",
          price: 15.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/milk-shake-chocolate.jpg",
          menuCategoryId: dessertsCategoryBK.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
        {
          name: "Donut",
          description: "Donut com cobertura de chocolate.",
          price: 10.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/donut.jpg",
          menuCategoryId: dessertsCategoryBK.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
        {
          name: "Brownie",
          description: "Brownie de chocolate com nozes.",
          price: 14.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/brownie.jpg",
          menuCategoryId: dessertsCategoryBK.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
      ],
    });

    const kidsCategory = await tx.menuCategory.create({
      data: {
        name: "Kids",
        restaurantId: burgerKing.id,
      },
    });

    await tx.product.createMany({
      data: [
        {
          name: "Hambúrguer Kids",
          description: "Hambúrguer pequeno para crianças.",
          price: 15.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/hamburguer-kids.jpg",
          menuCategoryId: kidsCategory.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
        {
          name: "Batata Frita Kids",
          description: "Batata frita pequena para crianças.",
          price: 8.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/batata-kids.jpg",
          menuCategoryId: kidsCategory.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
        {
          name: "Nuggets de Frango",
          description: "Nuggets de frango empanados.",
          price: 12.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/nuggets-frango.jpg",
          menuCategoryId: kidsCategory.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
        {
          name: "Milk Shake Kids",
          description: "Milk shake pequeno para crianças.",
          price: 10.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/milk-shake-kids.jpg",
          menuCategoryId: kidsCategory.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
        {
          name: "Sorvete Kids",
          description: "Sorvete de casquinha pequeno para crianças.",
          price: 6.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/sorvete-kids.jpg",
          menuCategoryId: kidsCategory.id,
          restaurantId: burgerKing.id,
          ingredients: [],
        },
      ],
    });
  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
