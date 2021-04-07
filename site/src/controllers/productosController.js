const db = require('../database/models')
const { Op } = require('sequelize')

module.exports = {
    catalogo: (req, res) => {

        const products = db.Products.findAll({
            include: [{ association: 'images' }]
        })
        const animal = db.Animals.findAll()

        Promise.all([products, animal])
            .then(data => {
                return res.render('catalogo', {
                    title: 'Catalogo',
                    products: data[0],
                    animals: data[1],
                    data
                })
            })
            .catch(error => res.send(error))
    },
    detalle: (req, res) => {

        db.Products.findOne({
            where: {
                id: req.params.id
            },
            include: [{association: 'images'},
                {association: 'subCategory',
                    include: [{association: 'category',
                        include: [{association: 'animal'}]
                    }]
                }]
        })
        .then(product => {
            res.render("productDetail", {
                title: 'Detalle',
                product
            })
        })

       
    },
    carrito: (req, res) => {
        res.render('productCart', {
            title: 'Carrito'
        })
    },
    animal: (req, res) => {

        const productos = db.Animals.findOne({
            where: {
                id: req.params.animalId
            },
            include: [{
                association: 'category',
                include: [{
                    association: 'subCategory',
                    include: [{
                        association: 'products',
                        include: [{ association: 'images' }]
                    }]
                }]
            }]
        })
        const animals = db.Animals.findAll()
        Promise.all([productos, animals])
            .then(data => {

                let productos = []

                data[0].category.forEach(categorias => {
                    categorias.subCategory.forEach(subCategorias => {
                        subCategorias.products.forEach(product => {
                            productos.push(product)
                        })
                    });
                    return productos
                });

                let categories = data[0].category.filter(categorias => {
                    return categorias
                })

                return res.render('filters', {
                    title: 'Animal',
                    animals: data[1],
                    data: data[0],
                    products: productos,
                    typeCat: data[0].animal,
                    categories
                })
            })
            .catch(error => res.send(error))

    },
    category: (req, res) => {

        const productos = db.Animals.findOne({
            where: {
                id: req.params.animalId
            },
            include: [{
                association: 'category',
                where: {
                    id: req.params.categoryId
                },
                include: [{
                    association: 'subCategory',
                    include: [{
                        association: 'products',
                        include: [{ association: 'images' }]
                    }]
                }]
            }]
        })

        const animals = db.Animals.findAll()

        const categoria = db.Categories.findByPk(req.params.categoryId)

        Promise.all([productos, animals, categoria])
            .then(data => {

                let productos = []
                data[0].category.forEach(categorias => {
                    categorias.subCategory.forEach(subCategorias => {
                        subCategorias.products.forEach(product => {
                            productos.push(product)
                        })
                    });
                    return productos
                });

                let subCategories = []
                data[0].category.forEach(categorias => {
                    categorias.subCategory.forEach(subCategorias => {
                        subCategories.push(subCategorias)
                    })
                })

                return res.render('filters', {
                    title: 'Categorias',
                    animals: data[1],
                    data: data[0],
                    products: productos,
                    typeCat: data[2].category,
                    subCategories,
                    dataList: data,
                    
                })
            })
            .catch(error => res.send(error))

    },
    subCategory: (req, res) => {

        const productos = db.Animals.findOne({
            where: {
                id: req.params.animalId
            },
            include: [{
                association: 'category',
                where: {
                    id: req.params.categoryId
                },
                include: [{
                    association: 'subCategory',
                    where: {
                        id: req.params.subCategoryId
                    },
                    include: [{
                        association: 'products',
                        include: [{ association: 'images' }]
                    }]
                }]
            }]
        })

        const animals = db.Animals.findAll()

        const categoria = db.Categories.findByPk(req.params.categoryId)

        const subCategoria = db.SubCategories.findByPk(req.params.subCategoryId)

        const subCategoryList = db.Animals.findOne({
            where: {
                id: req.params.animalId
            },
            include: [{
                association: 'category',
                where: {
                    id: req.params.categoryId
                },
                include: [{
                    association: 'subCategory',
                }]
            }]
        })

        Promise.all([productos, animals,categoria, subCategoria, subCategoryList])
            .then(data => {

                let productos = []
                data[0].category.forEach(categorias => {
                    categorias.subCategory.forEach(subCategorias => {
                        subCategorias.products.forEach(product => {
                            productos.push(product)
                        })
                    });
                    return productos
                });

                let subCategories = []
                data[4].category.forEach(categorias => {
                    categorias.subCategory.forEach(subCategorias => {
                        subCategories.push(subCategorias)
                    })
                })

                return res.render('filters', {
                    title: 'Sub Categorias',
                    animals: data[1],
                    data: data[0],
                    products: productos,
                    typeCat: data[2].category,
                    subCategories,
                    subCatSelected: data[3],
                    dataList: data
                })
            })
            .catch(error => res.send(error))

    },
    search: (req, res) => {
        const products = db.Products.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${req.query.b}%` } },
                    { description: { [Op.like]: `%${req.query.b}%` } }
                ]
            },
            include: [{ association: 'images' }]
        })
        const animal = db.Animals.findAll()

        Promise.all([products, animal])
            .then(data => {
                return res.render('catalogo', {
                    title: 'Busqueda',
                    products: data[0],
                    animals: data[1],
                    search: "Busqueda"
                })
            })
            .catch(error => res.send(error))
    }
}