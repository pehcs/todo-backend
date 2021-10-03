import Tasks from '../models/Tasks.js'

const tasks = [];

const TaskController = {

  async showTask(req, res) {
    const taskData = await Tasks.findAll()
  
    res.json(taskData)
    
  },

  async addTask(req, res) {
    const taskData = {
      title: req.body.title,
      task: req.body.task
    }

    await Tasks.create({
        title: taskData.title,
        task: taskData.task
    }).then(()=>{
      res.status(200).end()
    }).catch(e=>{
      res.status(400).end()
    })
  },

  async deleteTask(req, res) {
    const id = req.params.id;

    await Tasks.destroy({
      where:{
        id: req.params.id
      }
    })

    res.end();
  },

  editTask(req, res) {
    const id = req.params.id;
    const title = req.body.title;
    const task = req.body.task;

    tasks.map((taskItem) => {
      console.log(taskItem.id);
      if (taskItem.id === id) {
        taskItem.title = title;
        taskItem.task = task;
      }
    });

    console.log(tasks);
    res.end();
  },
};

export default TaskController;
