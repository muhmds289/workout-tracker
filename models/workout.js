const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Enter an exercise type"
        },
        
        name: {
            type: String,
            trim: true,
            required: "Enter an exercise name"
        },

        duration: {
            type: Number,
            required: "Enter an exercise duration in minutes"
        },

        weight: {
            type: Number,
            required: "Enter the number of pounds"
        },

        reps: {
            type: Number,
            required: "Enter the amount of reps"
        },

        sets: {
            type: Number,
            required: "Enter the amount of sets"
        },

        distance: {
            type: Number,
            required: "Enter the distance, if cardio, in miles"
        }
    }]
}, 

{
    toJSON: {
        // include any virtual properties when data is requested
        virtuals: true
    }
});

// adds a dynamically-created property to schema
workoutSchema.virtual("totalDuration").get(function () {
    // "reduce" array of exercises down to just the sum of their durations
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;