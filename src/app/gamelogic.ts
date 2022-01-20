import { Status } from "./gamestatus";

export class Gamelogic {
    gameField: Array<number> =[];

    currentTurn:number;

    gameStatus: Status;

    winSituationsOne: Array<Array<number>>=[
        [1,1,1,0,0,0,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,1,1,1],
        [1,0,0,1,0,0,1,0,0],
        [0,1,0,0,1,0,0,1,0],
        [0,0,1,0,0,1,0,0,1],
        [1,0,0,0,1,0,0,0,1],
        [0,0,1,0,1,0,1,0,0]
    ];

       winSituationsTwo: Array<Array<number>>=[
        [2,2,2,0,0,0,0,0,0],
        [0,0,0,2,2,2,0,0,0],
        [0,0,0,0,0,0,2,2,2],
        [2,0,0,2,0,0,2,0,0],
        [0,2,0,0,2,0,0,2,0],
        [0,0,2,0,0,2,0,0,2],
        [2,0,0,0,2,0,0,0,2],
        [0,0,2,0,2,0,2,0,0]
    ];

    public constructor(){
        this.gameStatus= Status.STOP;
        this.gameField= [0,0,0,0,0,0,0,0,0];
    }

    gameStart(): void{
         this.gameField= [0,0,0,0,0,0,0,0,0];
         this.currentTurn= 1;
        this.gameStatus=  Status.START
    }

    setField(position: number, value: number): void{
        this.gameField[position]= value; 
    }

    getPlayerColorClass(){
        const colorClass = (this.currentTurn ===2)? 'player-two' : 'player-one';
        return colorClass;
    }

    changePlayer():void{
        this.currentTurn = (this.currentTurn===1)? 2 : 1;
    }

    arrayEquals(a:Array<any>, b:Array<any>): boolean{
        return Array.isArray(a) && Array.isArray(b) && a.length===b.length && a.every((value,index)=>value === b[index]);
    }
    
   async checkGameFull(): Promise<boolean>{
        let isFull = true;

         if(this.gameField.includes(0)){
             isFull=false;
         }

         if(isFull){
             this.gameEnd();
             return true;
         }
         else{
             return false;
         }
    }

    gameEnd():void{
        this.gameStatus= Status.STOP;
    }

    async checkGameWinner(): Promise<boolean>{
         let isWinner = false;

         const checkArray=(this.currentTurn===1)? this.winSituationsOne: this.winSituationsTwo;
         
         const currentArray=[];

         this.gameField.forEach((subfield, index)=>{
            if(subfield!==this.currentTurn){
                currentArray[index]=0
            }else{
                currentArray[index]=subfield;
            }
         });

          checkArray.forEach((checkfield, checkindex)=>{
            if(this.arrayEquals(checkfield, currentArray)){
                isWinner=true;
            }else{

            }
          });

         if(isWinner){
             this.gameEnd();
             return true;
         }
         else{
             return false;
         }
    }
}
