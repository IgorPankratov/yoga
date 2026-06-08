//Тестируем функцию таймера
describe("Таймер", function() {
    it("Возвращает ли функция объект", function() {
        assert.typeOf(getTimeRemaining(), "object")
    });

    it("Устанавливаем таймер обратного отсчёта", function() {
        assert.typeOf(setClock("timer", deadline), "string");
    });

    describe("Общая сумма", function() {
        it("Изначально равен 0", function() {
            assert.equal(total, 0);
        })
    })
})