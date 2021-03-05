import mongoose from 'mongoose'


mongoose
    .connect('mongodb://localhost:27017/features', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Database Online");
    })
    .catch(err => {
        console.log('Could not conect to database: ', err)
    });


const featureSchema = new mongoose.Schema({
    id: String,
    name: String,
    type: String,
    description: String,
    createdOn: { type : Date, default: Date.now },
    version: Number,
    owner: String,
    data: String
});

export const Feature = mongoose.model('Feature', featureSchema)