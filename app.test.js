const request = require("supertest");
const { app, db } = require("./app");

describe("Task Manager API", () => {

    test("GET /tasks should return tasks", async () => {
        const response = await request(app).get("/tasks");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("POST /tasks should create a new task", async () => {
        const response = await request(app)
            .post("/tasks")
            .send({
                title: "Test Task"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Test Task");
        expect(response.body.completed).toBe(0);
    });

    test("PUT /tasks/:id should update task", async () => {
        const createResponse = await request(app)
            .post("/tasks")
            .send({
                title: "Task to Update"
            });

        const taskId = createResponse.body.id;

        const response = await request(app)
            .put(`/tasks/${taskId}`)
            .send({
                completed: true
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Task updated");
    });

    test("DELETE /tasks/:id should delete task", async () => {
        const createResponse = await request(app)
            .post("/tasks")
            .send({
                title: "Task to Delete"
            });

        const taskId = createResponse.body.id;

        const response = await request(app)
            .delete(`/tasks/${taskId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Task deleted");
    });

});


afterAll((done) => {
    db.close(done);
});