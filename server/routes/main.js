export default function (app) {
    app.get('/', (request, response) => {
        response.end('Tic-Tac-Toe Server!');
    });
}
