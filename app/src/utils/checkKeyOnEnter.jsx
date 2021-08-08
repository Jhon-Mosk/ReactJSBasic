//проверяем нажат ли энтер в поле ввода, если нажат отправляем сообщение
export const checkKeyOnEnter = (keyCode) => {
    if (keyCode === "Enter") {
        return true
    };
    return false
}