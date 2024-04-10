const mongoose = require('mongoose')

const Employee_Schema = mongoose.Schema(
    {
        employ_id:{
            type:Number,
            required:true,
        },
        name: {
            type: String,
            required: [true, "Please enter a product name"]
        },
        department_id: {
            type: Number,
            required: true
        },
        department_name: {
            type: String,
            required: true
        },
        sallery:{
            type: Number,
            require:true
        }
    },
    {
        timestamps: true
    }
)


const Employee = mongoose.model('Employee', Employee_Schema);

module.exports = Employee;