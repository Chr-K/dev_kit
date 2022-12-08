
 class Grid{

    constructor(grid)
    {
        this.parent_ID = grid.parent_ID
        this.col_per_row = grid.col_per_row
        this.number_of_rows = grid.number_of_rows
    }
 
    
    //ADD USER INPUTS LATER IN LISTENER
    grid_background_color = 'black;'
    square_styles = 'box-sizing:border-box; height:2vh; border:1px solid darkblue; color:white;'
    highlight_style = 'box-sizing:border-box; height:2vh; border:1px solid red;'
    //
    shouldwait = false
    current_x
    current_y
    initialize_grid(){
        var grid_container = document.createElement('div')
        grid_container.id = 'grid_container'
        grid_container.className = 'grid_container'
        var grid_area = this.col_per_row*this.number_of_rows
        this.fillgrid(grid_container,grid_area)
        grid_container.style = 'display:grid; margin-top:0;background-color:' + this.grid_background_color + 'grid-template-columns:' + this.column_amnt()
        document.getElementById('container_main').append(grid_container)
        this.style_squares(this.square_styles,grid_area)
        this.mousestate_listener()
        this.mouse_down_listenr()
        this.mouse_move_listener()
        this.mouse_up_listener()


    }

    //fill grid takes grid area and generates and equal amount of squares with unique ids
    fillgrid(grid_container,grid_area){
        var row_counter = 0
        for (var i = 0; i < grid_area;i++)
        {
            if(i%this.col_per_row === 0 && i !== 0)
            {
                row_counter++
            }
            var grid_square = document.createElement('div')
            grid_square.id = 'square_' + '('+i%this.col_per_row+','+row_counter+')'
            grid_square.className = 'grid_square'
            
            grid_container.append(grid_square)
        }
    }
    //column amnt generates a string repeating 'auto' equal to col-per-row property
    column_amnt(){

        var grid_column_amnt = ''
        
                for (var i =0;i<this.col_per_row;i++)
        {
            grid_column_amnt += 'auto '
        }
        return(grid_column_amnt + ';')
    }
    //style squares adds style to the squares generated from fillgrid
    style_squares(square_styles,grid_area){
        var row_counter = 0;
        for (var i = 0;i<grid_area;i++)
        {
            if(i%this.col_per_row === 0 && i!==0)
            {
                row_counter++
            }
            document.getElementById('square_' + "(" + i%this.col_per_row+','+ row_counter + ')').style = square_styles
        }

    }
    //mousestate tests if the client is holding down their mouse
    mousestate_listener()
    {
        document.addEventListener('mousedown',()=>{
            this.mousestate = true
        })
        document.addEventListener('mouseup',()=>{
           this.mousestate = false
        })
    }
    //highlight will highlight the selected squares while client mouse is down

    mouse_down_listenr(){
        document.addEventListener('mousedown',(e)=>{
            var element_selector = document.elementFromPoint(e.clientX,e.clientY)
            if (element_selector.classList.contains('highlight') == false)
            {
                element_selector.classList+=' highlight'
                element_selector.style = this.highlight_style
                this.start_x = parseInt(this.ID_JANITOR(element_selector.id)[0])
                this.start_y = parseInt(this.ID_JANITOR(element_selector.id)[1])
            }
            else if (element_selector.classList.contains('highlight')==true)
            {
                element_selector.classList.remove('highlight')
                element_selector.style = this.square_styles
                this.start_x = parseInt(this.ID_JANITOR(element_selector.id)[0])
                this.start_y = parseInt(this.ID_JANITOR(element_selector.id)[1])
            }

        })
    }

    mouse_move_listener(){
        document.addEventListener('mousemove',(e)=>{
            var element_selector = document.elementFromPoint(e.clientX,e.clientY)
                this.selector(element_selector)

        })
    }

    mouse_up_listener(){

    }

    ID_JANITOR(id){

        var id_cleaner_1 = id.replace('square_','')
        var id_cleaner_2 = id_cleaner_1.replace('(','')
        var id_cleaner_3 = id_cleaner_2.replace(')','')
        var comma_search = id_cleaner_3.search(',')
        var x_coord = id_cleaner_3.slice(0,comma_search)
        var y_coord = id_cleaner_3.slice(comma_search + 1)
        var cleaned_coordinates = [x_coord,y_coord]
        return (cleaned_coordinates)

    }
    selector(element_selector){
        var endx = parseInt(this.ID_JANITOR(element_selector.id)[0])
        var endy = parseInt(this.ID_JANITOR(element_selector.id)[1])

        if(this.mousestate===true){
            if(this.shouldwait===false)
            {
                if(this.start_x!==endx || this.start_y !== endy)
                {
                    if(this.current_x !==endx || this.current_y !== endy)
                    {
                        this.current_x = endx
                        this.current_y = endy

                        var y_length = Math.abs(this.start_y - endy) + 1
                        var x_length = Math.abs(this.start_x-endx) + 1
                        var area = x_length*y_length
                        var row_counter = 0
                        var col_counter = 0
                        for(var i = 0; i < area; i++){
                            if(x_length>y_length){
                                if(x_length%i===0 && i !== 0)
                                {
                                    col_counter++
                                    row_counter=0
                                    console.log(x_length-row_counter)
                                }

                            }
                            if(x_length<y_length){
                                if(y_length%i===0 && i !== 0){
                                    row_counter++
                                    col_counter=0
                                }
                                console.log(x_length-row_counter)

                            }
                            //document.getElementById('square_' + '('+this.start_x+col_counter+','+this.start_y+row_counter+')').style = this.highlight_style
                        }

                    }
                }

            this.shouldwait = true
            setTimeout(() => {
            this.shouldwait = false
            }, 100);
            }


        }
    }


    
 }

const grid_props = {
    parent_ID:'container_main',
    col_per_row:100,
    number_of_rows:50,
}
document.body.style.margin = 0
 const main_grid = new Grid(grid_props)
 main_grid.initialize_grid()