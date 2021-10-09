PShader shader;
int i=1;
void setup() {
  size(500,500, P2D);
  noStroke();

  shader = loadShader("pallete.frag");
}

void draw() {
  shader.set("u_resolution", float(width), float(height));
  shader.set("u_mouse", float(mouseX), float(mouseY));
  shader.set("u_time", millis() / 1000.0);
  shader(shader);
  rect(0,0,width,height);
  if (frameCount%81==0 && i<82){
    save(i+".png");
    i++;
  }

}
