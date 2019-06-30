var ability = {
    createInstance: function() {
        var inst = {
            name: 'Ability',
            params: {
                checksBudget: {
                    name: 'Checks Budget',
                    type: 'number',
                    value: 2
                }
            },
            interface: {
                checks: {
                    frame: undefined,
                    recentChecks: {},
                    checkedThisFrame: 0
                },
                isEnabled: function(inst, playerInst) {
                    var checks = inst.interface.checks;
                    function handleNewFrame() {
                        for (var req in checks.recentChecks) {
                            if (game.api.lastFrame - checks.recentChecks[req].ping >= 10) {
                                delete checks.recentChecks[req];
                            }
                        }
                        checks.checkedThisFrame = 0;
                        checks.frame = game.api.lastFrame;
                    }
                    function shouldCalculate() {
                        var record = checks.recentChecks[playerInst.gameObject.id];
                        if (!record) {
                            return true;
                        }
                        if (game.api.lastFrame === record.frame) {
                            return false;
                        }
                        if (checks.checkedThisFrame >= inst.params.checksBudget.value) {
                            return false;
                        }
                        var worse = 0;
                        for (var x in checks.recentChecks) {
                            if (parseInt(x) === playerInst.gameObject.id) {
                                continue;
                            }
                            var cur = checks.recentChecks[x];
                            if (game.api.lastFrame - cur.frame > game.api.lastFrame - record.frame) {
                                ++worse;
                            }
                        }
                        return worse < inst.params.checksBudget.value - checks.checkedThisFrame;
                    }
                    if (typeof checks.frame === 'undefined' || game.api.lastFrame > checks.frame) {
                        handleNewFrame();
                    }
                    if (shouldCalculate()) {
                        var record = {};
                        var res = inst.interface.isEnabledImpl(inst, playerInst, record);
                        record.frame = game.api.lastFrame;
                        record.result = res;
                        checks.recentChecks[playerInst.gameObject.id] = record;
                        checks.checkedThisFrame++;
                    }
                    checks.recentChecks[playerInst.gameObject.id].ping = game.api.lastFrame;
                    return checks.recentChecks[playerInst.gameObject.id].result;
                },
                isEnabledImpl: function(inst, playerInst) {
                    return true;
                },
                coroutine: function* (inst, playerInst) {}
            },
        };
        return inst;
    }
};

module.exports = ability;
