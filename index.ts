import express from 'express';
import { Feature } from './mongoSetup';
const bodyParser = require('body-parser');


const app = express();

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/api/features/feature", async (req:any, res:any) => {

    try {
        console.log('request body:', req.body)
        const features = new Feature(req.body) 
        const state = await features.save();
        console.log('state', state)
        console.log(features);
        res.status(200).send({
            message: `Feature craeted with ID : ${state._id}`,
            status: 'Saved Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(400).send('invalid payload')
    }
    
});

app.put("/api/features/feature/:fid", async (req:any, res:any) => {

    try {
        const { fid } = req.params;
        console.log('body', req.body)
        const x = Feature.findByIdAndUpdate(fid, req.body, {runValidators: false});
        console.log(x)
        res.status(200).send({
            message: `Feature updated with id: ${fid}`,
        })
    } catch (error) {
        res.status(400).send('invalid payload')
    }
    
});

app.delete("/api/features/feature/:fid", async (req:any, res:any) => {

    try {
        console.log('in delete')
        const { fid } = req.params
        const op = await Feature.findByIdAndDelete(fid)
        const message = op ? 'Feature Deleted' : 'No feature found with that ID'
        console.log(op);
        res.status(200).send({
            message,
            op
        })
    } catch (error) {
        res.status(500).send('internal server error');
    }
    
});

app.get("/api/features", async (req:any, res:any) => {

    try {
        const features = await Feature.find({})
        console.log(features);
        res.status(200).send({
            message: 'All Features Fetched',
            features
        })
    } catch (error) {
        res.status(500).send('internal server error')
    }
    
})



app.get("/api/features/:fid", async (req:any, res:any) => {

    try {
        const feature = await Feature.findById(req.params.fid)
        const message = feature ? 'Feature Extracted' : 'No feature found with that ID'
        console.log(feature);
        res.status(200).send({
            message,
            feature
        })
    } catch (error) {
        res.status(500).send('internal server error')
    }
    
})

app.listen(7000, () => {
    console.log('Server running on 7000');
})