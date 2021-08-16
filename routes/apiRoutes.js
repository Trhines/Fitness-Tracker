const path = require('path')
const db = require('../models')

module.exports = (app) => {

    app.get('/api/workouts', async (req, res) => {
        try{
            const workouts = await db.Workout.find({})
            if(!workouts){
                console.log("not found")
                res.status(404).json({ message: "no workouts found"})
            }
            res.json(workouts)

        } catch (err){
            res.status(500).json(err)
        }
    })

    app.put('/api/workouts/:id', async(req, res)=>{
        try{
            const workout = await db.Workout.findByIdAndUpdate(req.params.id)
            const newExercise = [...workout.exercises, req.body]
            const update = await workout.update({exercises: newExercise})
            res.status(200).json(update)
        }catch(err){
            res.status(500).json(err)
        }
    })

    app.post('/api/workouts/', async ({body}, res)=>{

        console.log(body)
        try{
            const newWorkout = new db.Workout(body)
            const addedWorkout = await db.Workout.create(newWorkout)
            console.log(addedWorkout)
            res.status(200).json(addedWorkout)
        }catch(err){
            res.status(500).json(err)
        }
    })

    app.get('/api/workouts/range', async (req, res)=>{
        try{
            const workouts = await db.Workout.find({})
            res.status(200).json(workouts)
        }catch(err){
            res.status(500).json(err)
        }
    })
}