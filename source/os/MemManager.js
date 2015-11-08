///<reference path="../globals.ts" />
///<reference path="../host/control.ts" />
///<reference path="../os/shell.ts"/>
/**
 * Created by jarettmiller on 10/19/15.
 */
var TSOS;
(function (TSOS) {
    var MemManager = (function () {
        function MemManager(memBlock, blockBases, blockLimits) {
            if (memBlock === void 0) { memBlock = 0; }
            if (blockBases === void 0) { blockBases = [0, 256, 512]; }
            if (blockLimits === void 0) { blockLimits = [256, 512, 768]; }
            this.memBlock = memBlock;
            this.blockBases = blockBases;
            this.blockLimits = blockLimits;
        }
        MemManager.prototype.loadInputProg = function (prog) {
            var insertToMem;
            var memIndex = this.blockBases[this.memBlock];
            if (this.memBlock < 3 && prog.length < 768) {
                for (var i = 0; i < prog.length; i++) {
                    insertToMem = prog.slice(i, i + 2);
                    _Memory.mem[memIndex] = insertToMem;
                    _Kernel.krnTrace("Program: " + prog + "Inserted memory at: " + memIndex);
                    i++;
                    memIndex++;
                }
                var base = this.blockBases[this.memBlock];
                var limit = this.blockLimits[this.memBlock];
                _PCB = new TSOS.PCB();
                _PCB.init(base, limit);
                _StdOut.putText("Progam Loaded To memory, Pid = " + _PCB.PiD);
                _OsShell.pid++;
                TSOS.Control.editMemoryTbl();
                this.memBlock++;
            }
            else {
                _StdIn.putText("Program failed to load in to memory");
            }
        };
        return MemManager;
    })();
    TSOS.MemManager = MemManager;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=memManager.js.map