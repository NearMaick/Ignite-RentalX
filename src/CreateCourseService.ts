interface Course {
  name: string;
  duration?: number;
  educator: string
}

class CreateCourseService {

  execute({name, duration = 0, educator}: Course) {
    console.log(name, duration, educator)
  }
}

export default new CreateCourseService()