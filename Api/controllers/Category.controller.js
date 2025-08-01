import { handleError } from "../helpers/handleError.js";
import Category from "../models/category.model.js";


export const addCategory = async (req, res, next)=>{ 
    try {
        const {name, slug}= req.body
        const category = await Category.create({
            name,
             slug
        })

        await category.save()
        res.status(201).json({
            success: true,
            message: "Category created successfully",
             })

    } catch (error) {
        next(handleError(500, error.message))
    }

}

export const showCategory = async (req, res, next)=>{
 try {
        const {categoryid} = req.params
        const category = await Category.findById(categoryid)
        if(!category){
            next(handleError(404, 'Data not found.'))
        }
        res.status(200).json({
            success: true,
            category
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const updateCategory = async (req, res, next)=>{
 try {
        const {categoryid}= req.params
        const {name, slug}= req.body
       
        const category = await Category.findByIdAndUpdate(
            categoryid, {
                name,
                slug
            },{new: true}

        )

        // if(!category){
        //     next(handleError(404, 'Data not found.'))
        // }

        res.status(200)
        .json({
            success: true,
            message: "Category updated successfully",
            category
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const deleteCategory = async (req, res, next)=>{
 try {
        const {categoryid} = req.params

        await Category.findByIdAndDelete(categoryid)
    
        res.status(200)
        .json({
            success: true,
            message: "Category deleted successfully",
        
        })



    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const getAllCategory = async (req, res, next)=>{
 try {
        const category = await Category.find().sort({name: 1}).lean().exec()
        res.status(200)
        .json({
            success: true,
            message: "Category list",
             category
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}